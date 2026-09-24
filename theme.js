/**
 * ============================================================================
 * EDUNOVIX-AI GLOBAL THEME CONTROLLER (themes.js)
 * ============================================================================
 * Central source of truth for:
 * - Light Mode & Dark Mode state
 * - Persistence across all project pages using 'edunexa-theme'
 * - System color preference detection with explicit user override
 * - Instant, flash-free theme switching without page reload
 * - Multi-button synchronization with full ARIA accessibility
 * - Cross-tab synchronization
 * ============================================================================
 */

(function () {
  'use strict';

  // Constants
  const STORAGE_KEY = 'edunexa-theme';
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';
  const ROOT = document.documentElement;

  // SVG Icons for clean, crisp rendering inside toggles
  const ICON_SUN = `<svg class="theme-toggle-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>`;

  const ICON_MOON = `<svg class="theme-toggle-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>`;

  /**
   * Safely read from localStorage
   */
  function getSavedTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === THEME_DARK || saved === THEME_LIGHT) {
        return saved;
      }
    } catch (err) {
      console.warn('[EDUNOVIX-AI Themes] localStorage read error:', err);
    }
    return null;
  }

  /**
   * Safely write to localStorage
   */
  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (err) {
      console.warn('[EDUNOVIX-AI Themes] localStorage write error:', err);
    }
  }

  /**
   * Detect initial theme:
   * 1. Saved preference in localStorage ('edunexa-theme')
   * 2. OS prefers-color-scheme
   * 3. Fallback to Light Mode
   */
  function detectPreferredTheme() {
    const saved = getSavedTheme();
    if (saved) {
      return saved;
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEME_DARK;
    }

    return THEME_LIGHT;
  }

  /**
   * Get currently active theme
   */
  function getTheme() {
    return ROOT.getAttribute('data-theme') || THEME_LIGHT;
  }

  /**
   * Apply theme to root and update all components & buttons
   */
  function setTheme(theme, persist = true) {
    const validTheme = theme === THEME_DARK ? THEME_DARK : THEME_LIGHT;

    // Apply attribute to <html> element
    ROOT.setAttribute('data-theme', validTheme);

    // Sync color-scheme property for native browser inputs/scrollbars
    ROOT.style.colorScheme = validTheme;

    // Update meta theme-color tag if present, or create it
    updateMetaThemeColor(validTheme);

    // Save to localStorage if requested
    if (persist) {
      saveTheme(validTheme);
    }

    // Synchronize all toggle buttons across the DOM
    syncToggleButtons(validTheme);

    // Dispatch global custom events so any external listener updates immediately
    const detail = { theme: validTheme, isDark: validTheme === THEME_DARK };
    window.dispatchEvent(new CustomEvent('themechange', { detail }));
    window.dispatchEvent(new CustomEvent('edunexa-theme-change', { detail }));
  }

  /**
   * Toggle between Light and Dark Mode
   */
  function toggleTheme() {
    const current = getTheme();
    const next = current === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    setTheme(next, true);
    return next;
  }

  /**
   * Update browser top-bar color for mobile browsers
   */
  function updateMetaThemeColor(theme) {
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = theme === THEME_DARK ? '#090d16' : '#f8fafc';
  }

  /**
   * Synchronize all toggle buttons in DOM with proper ARIA, icons, and labels
   */
  function syncToggleButtons(theme) {
    const isDark = theme === THEME_DARK;
    const toggles = document.querySelectorAll('[data-theme-toggle]');

    toggles.forEach((button) => {
      // 1. Accessibility attributes
      button.setAttribute('role', 'button');
      button.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      const actionLabel = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
      button.setAttribute('aria-label', actionLabel);
      button.setAttribute('title', actionLabel);

      if (!button.hasAttribute('tabindex')) {
        button.setAttribute('tabindex', '0');
      }

      // 2. Active data states & classes
      button.setAttribute('data-current-theme', theme);
      if (isDark) {
        button.classList.add('theme-dark-active');
        button.classList.remove('theme-light-active');
      } else {
        button.classList.add('theme-light-active');
        button.classList.remove('theme-dark-active');
      }

      // 3. Icon update
      const iconContainer = button.querySelector('[data-theme-icon]') || button.querySelector('.theme-icon') || button;
      const existingIcon = button.querySelector('svg.theme-toggle-icon');
      
      if (existingIcon) {
        // Replace existing svg
        const temp = document.createElement('div');
        temp.innerHTML = isDark ? ICON_SUN : ICON_MOON;
        const newSvg = temp.firstElementChild;
        existingIcon.replaceWith(newSvg);
      } else {
        const dedicatedIconEl = button.querySelector('[data-theme-icon]');
        if (dedicatedIconEl) {
          dedicatedIconEl.innerHTML = isDark ? ICON_SUN : ICON_MOON;
        }
      }

      // 4. Text update if element exists
      const textContainer = button.querySelector('[data-theme-text]') || button.querySelector('.theme-toggle-text');
      if (textContainer) {
        textContainer.textContent = isDark ? 'Light Mode' : 'Dark Mode';
      }
    });
  }

  /**
   * Attach click and keyboard listeners to toggle buttons
   */
  function attachToggleListener(button) {
    if (button.__edunexaThemeBound) return;
    button.__edunexaThemeBound = true;

    // Click handler
    button.addEventListener('click', function (e) {
      e.preventDefault();
      toggleTheme();
    });

    // Keyboard accessibility for non-native button elements (Space and Enter)
    button.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }

  /**
   * Bind all theme toggles currently present in the document
   */
  function bindAllToggles() {
    const toggles = document.querySelectorAll('[data-theme-toggle]');
    toggles.forEach(attachToggleListener);
    syncToggleButtons(getTheme());
  }

  /**
   * Initialize theme immediately
   */
  function init() {
    const initialTheme = detectPreferredTheme();
    setTheme(initialTheme, false);

    // When DOM is ready, wire up all buttons
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        bindAllToggles();
      });
    } else {
      bindAllToggles();
    }

    // Observe future DOM additions (e.g. dynamically injected modals or headers)
    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver((mutations) => {
        let hasNewToggles = false;
        for (const m of mutations) {
          if (m.addedNodes && m.addedNodes.length > 0) {
            for (const node of m.addedNodes) {
              if (node.nodeType === 1) {
                if (node.matches && node.matches('[data-theme-toggle]')) {
                  hasNewToggles = true;
                } else if (node.querySelector && node.querySelector('[data-theme-toggle]')) {
                  hasNewToggles = true;
                }
              }
            }
          }
        }
        if (hasNewToggles) {
          bindAllToggles();
        }
      });

      observer.observe(document.body || document.documentElement, {
        childList: true,
        subtree: true,
      });
    }
  }

  // Synchronize theme across tabs/windows in real time
  window.addEventListener('storage', function (e) {
    if (e.key === STORAGE_KEY && e.newValue) {
      if (e.newValue === THEME_DARK || e.newValue === THEME_LIGHT) {
        setTheme(e.newValue, false);
      }
    }
  });

  // Listen to OS system preference changes (only applies if user has not explicitly set a preference)
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
      const userSaved = getSavedTheme();
      if (!userSaved) {
        setTheme(e.matches ? THEME_DARK : THEME_LIGHT, false);
      }
    };
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemChange);
    }
  }

  // Run initialization immediately
  init();

  // Expose public API on window.EdunexaTheme for developers & other scripts
  window.EdunexaTheme = {
    getTheme,
    setTheme,
    toggleTheme,
    init,
    syncToggles: bindAllToggles,
    storageKey: STORAGE_KEY,
  };

})();
