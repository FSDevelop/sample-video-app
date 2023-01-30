import { mount } from '@vue/test-utils';
import ShowView from '@/views/ShowView.vue';
import allShows from '../fixtures/allShowsFixture';
jest.mock('vue-router');

describe('Unit Test for Show View use cases', () => {
    // mock api calls
    global.fetch = jest.fn(() =>
        Promise.resolve({ json: () => Promise.resolve(allShows[0]) })
    );

    it('Check detail page loads correctly', async () => {
        require('vue-router').useRoute.mockReturnValueOnce({ name: 'show', params: { id: 1 } });

        const wrapper = mount(ShowView);

        // wait for promises to be resolved
        await new Promise(process.nextTick);

        // check name correctly displayed
        expect(wrapper.find('h1.show__name').text()).toBe(allShows[0].name);

        // check average rating correctly displayed
        expect(wrapper.find('td b').text()).toBe('Average Rating:');
    });
});
