import { TestBed } from '@angular/core/testing';
import { ɵgetDOM as getDOM } from '@angular/platform-browser';
import { NgxFaviconService } from './ngx-favicon.service';

describe('NgxFaviconService', () => {
  let doc: Document;
  let initialFavicon: any;
  let faviconService: NgxFaviconService;
  const testFaviconUrl = 'test_favicon_url';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    doc = getDOM().createHtmlDocument();
    initialFavicon = getDOM().querySelector(doc, "link[rel*='icon']");
    faviconService = new NgxFaviconService(doc);
  });

  it('should be created', () => {
    const service: NgxFaviconService = TestBed.get(NgxFaviconService);
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
    const faviconHrefByDOM = getDOM()
      .querySelector(doc, "link[rel*='icon']")
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
