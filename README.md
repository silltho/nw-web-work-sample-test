# Nativewaves Work Sample Test (Web)

## Description

**Time limit: 4 hours**.

We want you to write custom video controls for the given video component (`<VideoPlayer/>`). With your custom implemented controls the user should be able to. 

### play / pause

A button that shows the `<Pause />` icon when the video is playing and the `<PlayArrow />` icon when the video is paused. When pressing the button the video should toggle between playing and pausing.

### mute / unmute

Similar to the play/pause button this button should toggle between mute and unmute the video. When unmuting but the volume is 0 it should set the volume to 100%. It should also show the `<VolumeOff />` icon when the video is muted and a different icons when unmuted depending on the volume value. (`<VolumeMute />` below 33,`<VolumeDown />` between 33 and 66, `<VolumeUp />` above 66)

### volume
A Slider to control the volume. It should only be shown when the user hovers over the mute/unmute button.

### progress
A `<LinearProgress />` element that shows the current progress of the video.

## Additional Notes

- We already added **material-ui** and **styled-components** that we use in our projects. Beside them you are allowed to use any library or tool that helps you reach your target. But make sure you can explain your decision during the code review.
- All icons needed are provided by **material-ui/icons**
- Use a reference to html video element to access video events and properties.
- Change the `<VideoPlayer />` component as little as possible.
- Use the `npm run example` command to see and precompiled solution at **localhost:5000**. 
- If you have any questions feel free to contact Thomas Siller <ts@nativewaves.com> fia email or teams.


## Commands
`npm start` starts the development server at localhost:3000

`npm lint` static analysis of the project source code

`npm run example` shows a precompiled solution localhost:5000. You can play around with it to get a better understanding how we want the controls to work, but don't try to decompile or access the code.

## Evaluation Criteria

This is a list of criteria we will use to evaluate your assignment:

- Task Completion
- Code Style
- Architecture (e.g. Component Composition)
- Performance Optimization
- Lint Errors
- Type Safety
- Commits

## Submission
When you are done:

- delete the node_modules folder
- zip the project folder
- send the zipped version to <ts@nativewaves.com>

We will schedule a call to do a Code Review together.