import { describe, it, expect, beforeEach } from 'vitest';

describe('Sample Test', () => {
    it('should return true for 1 + 1 === 2', () => {
        expect(1 + 1).toBe(2);
    });
});

describe('Financial wheel pills', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <section id="financial-wellness-wheel" data-services-page="pages/services.html">
                <div id="fwSlicesGroup"></div>
                <div id="fwArrowsGroup"></div>
                <div id="fwWheelLabels"></div>
                <nav id="fwPillNav"></nav>
            </section>
        `;
        window.history.pushState({}, '', '/index.html');
    });

    it('renders color icons in each quick-select pill', async () => {
        await import('../financial wheel/wheel.js');

        const firstPill = document.querySelector('#fwPillNav .fw-pill');
        expect(firstPill).not.toBeNull();
        expect(firstPill?.querySelector('i.fas')).not.toBeNull();
        expect(firstPill?.querySelector('.fw-dot')).toBeNull();
    });
});