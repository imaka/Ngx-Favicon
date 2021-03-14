import { Injectable, Inject, OnDestroy, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEventPattern, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';

/**
 * A service to set the favicon.
 */
@Injectable({
  providedIn: 'root'
})
export class AngularFaviconService implements OnDestroy {
  private renderer: Renderer2;

  constructor(@Inject(DOCUMENT) private _doc: any, private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  private darkScheme = '(prefers-color-scheme:dark)';
  private subscriptionToColorScheme: Subscription;
  private prefersColorScheme$ = fromEventPattern(handler => window.matchMedia(this.darkScheme).addListener(handler as EventListener)).pipe(
    pluck('matches')
  );

  /**
   * Get the favicon of the current HTML document.
   */
  getFavicon() {
    return this._doc.querySelector("link[rel*='icon']");
  }

  /**
   * Set the title of the current HTML document.
   * @param iconURL - Default favicon URL
   * @param altIconURL - Optional, dark theme favicon URL
   */
  setFavicon(iconURL: string, altIconURL?: string) {
    const link = this.getFavicon() || this.renderer.createElement('link');
    let currentLinkHref = iconURL;

    if (altIconURL) {
      this.subscribeToChangesInTheme(link, iconURL, altIconURL);

      if (window.matchMedia(this.darkScheme).matches) {
        currentLinkHref = altIconURL;
      }
    }

    this.appendLinkTag(link, currentLinkHref);
  }

  /**
   * Subscribe to the theme color changes in browser/OS and apply the appropiate favicon
   * @param link - DOM element
   * @param iconURL - Default favicon URL
   * @param altIconURL - Optional, dark theme favicon URL
   */
  private subscribeToChangesInTheme(link: any, iconURL: string, altIconURL: string) {
    this.subscriptionToColorScheme = this.prefersColorScheme$.subscribe(isDarkTheme => {
      if (isDarkTheme) {
        this.appendLinkTag(link, altIconURL);
      } else {
        this.appendLinkTag(link, iconURL);
      }
    });
  }

  /**
   * Append new link to HEAD
   * @param link - DOM element
   * @param iconURL - favicon URL
   */
  private appendLinkTag(link: any, iconURL: string) {
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = iconURL;
    const head = this._doc.getElementsByTagName('head')[0];
    this.renderer.appendChild(head, link);
  }

  ngOnDestroy() {
    if (this.subscriptionToColorScheme) {
      this.subscriptionToColorScheme.unsubscribe();
    }
  }
}
