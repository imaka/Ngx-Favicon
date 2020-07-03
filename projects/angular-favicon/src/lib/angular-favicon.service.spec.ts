import { TestBed } from '@angular/core/testing';
import { AngularFaviconService } from './angular-favicon.service';
import { RendererFactory2 } from '@angular/core';

describe('AngularFaviconService', () => {
  let doc: Document;
  let initialFavicon: any;
  let faviconService: AngularFaviconService;
  let rendererFactory2: RendererFactory2;
  const testFaviconUrl = 'test_favicon_url';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    initialFavicon = doc.querySelector("link[rel*='icon']");
    faviconService = new AngularFaviconService(doc, rendererFactory2);
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
    const faviconHrefByDOM = doc
      .querySelector("link[rel*='icon']")
      .href.split('/')
      .pop();
    const faviconHrefByService = faviconService
      .getFavicon()
      .href.split('/')
      .pop();
    expect(faviconHrefByDOM).toEqual(testFaviconUrl);
    expect(faviconHrefByService).toEqual(testFaviconUrl);
  });
});
