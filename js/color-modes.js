/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
    'use strict'

    const getStoredTheme = () => localStorage.getItem('theme')
    const setStoredTheme = theme => localStorage.setItem('theme', theme)

    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme()
        if (storedTheme) {
            return storedTheme
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const setTheme = theme => {
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark')
        } else if (theme === 'auto') {
            document.documentElement.setAttribute('data-bs-theme', 'light')
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    }

    const showActiveTheme = theme => {
        const themeToggle = document.querySelector('#theme-toggle')
        if (!themeToggle) {
            return
        }

        const activeIcon = themeToggle.querySelector('.theme-icon-active')
        const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
        if (!btnToActive) {
            return
        }

        const iconClass = btnToActive.querySelector('i')?.getAttribute('data-theme-icon')

        document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
            element.classList.remove('active')
            element.setAttribute('aria-pressed', 'false')
        })

        btnToActive.classList.add('active')
        btnToActive.setAttribute('aria-pressed', 'true')

        // Update the active icon
        if (activeIcon && iconClass) {
            activeIcon.classList.forEach(cls => {
                if (cls.startsWith('bi-')) {
                    activeIcon.classList.remove(cls)
                }
            })
            activeIcon.classList.add(iconClass)
        }
    }

    // Initialize theme
    setTheme(getPreferredTheme())

    window.addEventListener('DOMContentLoaded', () => {
        showActiveTheme(getPreferredTheme())
        
        // Add click handlers to theme toggles
        document.querySelectorAll('[data-bs-theme-value]')
            .forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const theme = toggle.getAttribute('data-bs-theme-value')
                    setStoredTheme(theme)
                    setTheme(theme)
                    showActiveTheme(theme)
                })
            })
    })

    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = getStoredTheme()
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
            setTheme(getPreferredTheme())
        }
    })
})();