import { defineComponent, onMounted, ref, watchEffect } from 'vue'
import { getMeetup } from './meetupsService.ts'


export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const MIN_MEETUP_ID = 1;
    const MAX_MEETUP_ID = 5;
    const currentId = ref(1);
    const currentMeetup = ref({});

    onMounted(async () => currentMeetup.value = await getMeetup(currentId.value))

    watchEffect(() => getMeetup(currentId.value).then((response) => currentMeetup.value = response))

    const incrementId = () => currentId.value < MAX_MEETUP_ID ? currentId.value++ : currentId.value
    const decrementId = () => currentId.value > MIN_MEETUP_ID ? currentId.value-- : currentId.value

    return {
      currentId,
      MIN_MEETUP_ID,
      MAX_MEETUP_ID,
      currentMeetup,
      incrementId,
      decrementId,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" :disabled="currentId == MIN_MEETUP_ID" @click="decrementId">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button">
            <input
              id="meetup-id-1"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="1"
              v-model="currentId"
            />
            <label for="meetup-id-1" class="radio-group__label">1</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-2"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="2"
              v-model="currentId"
            />
            <label for="meetup-id-2" class="radio-group__label">2</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-3"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="3"
              v-model="currentId"
            />
            <label for="meetup-id-3" class="radio-group__label">3</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-4"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="4"
              v-model="currentId"
            />
            <label for="meetup-id-4" class="radio-group__label">4</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-5"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="5"
              v-model="currentId"
            />
            <label for="meetup-id-5" class="radio-group__label">5</label>
          </div>
        </div>

        <button class="button button--secondary" type="button" :disabled="currentId == MAX_MEETUP_ID" @click="incrementId">Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ currentMeetup.title }}</h1>
        </div>
      </div>

    </div>
  `,
})
