import { TestBed } from '@angular/core/testing';
import { AngularFaviconService } from './angular-favicon.service';
import { Renderer2, RendererFactory2 } from '@angular/core';

describe('AngularFaviconService', () => {
  let initialFavicon: HTMLLinkElement;
  let faviconService: AngularFaviconService;
  const testFaviconUrl = 'test_favicon_url';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    initialFavicon = document.querySelector("link[rel*='icon']");
    const rendererStub = ({
      createElement: jasmine.createSpy('createElement')
    } as unknown) as Renderer2;
    const rendererSpyFactory = jasmine.createSpyObj('RendererFactory2', ['createRenderer']);
    faviconService = new AngularFaviconService(document, rendererSpyFactory);
    rendererSpyFactory.createRenderer.and.returnValue(rendererStub);
  });

  it('should be created', () => {
    const service: AngularFaviconService = TestBed.inject(AngularFaviconService);
    expect(service).toBeTruthy();
  });
  it('should allow reading initial favicon', () => {
    if (!initialFavicon) {
      const faviconIsNull = faviconService.getFavicon() === null;
      const faviconIsUndefined = faviconService.getFavicon() === undefined;
      expect(faviconIsNull || faviconIsUndefined).toBe(true);
    } else {
      expect(faviconService.getFavicon().href).toEqual(initialFavicon.href);
    }
  });

  it('should set a favicon on the injected document', () => {
    faviconService.setFavicon(testFaviconUrl);
    const faviconLink = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    const faviconHrefByDOM = faviconLink.href.split('/').pop();
    const faviconHrefByService = faviconService
      .getFavicon()
      .href.split('/')
      .pop();
    expect(faviconHrefByDOM).toEqual(testFaviconUrl);
    expect(faviconHrefByService).toEqual(testFaviconUrl);
  });
});
