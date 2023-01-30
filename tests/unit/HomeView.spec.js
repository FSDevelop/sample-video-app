import { mount } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue';
import allShows from '../fixtures/allShowsFixture';

describe('Unit Test for Home View use cases', () => {
    // mock api calls
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(allShows) })
    );

    it('Check existence of galleries', async () => {
        const wrapper = mount(HomeView);

        // wait for promises to be resolved
        await new Promise(process.nextTick);

        // check that there are 4 show galleries
        expect(wrapper.findAll('div.slider').length).toBe(4);
    });
});
