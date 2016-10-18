import { addProviders, inject } from '@angular/core/testing';

describe('Map', () => {
    beforeEach(() => {
        addProviders([]);
    });

    it('should execute tests', inject([], () => {
      expect(true).toBeTruthy();
    }));
});
