## Memory leak demonstrations

### Recreate the issue of memory leak by following the steps on Stackblitz

#### How to start the project

1. Start this nuxt project using yarn dev
2. Once the project is running then click on Open in New Tab button on stackblitz environment.
3. This will open the current running project on a new tab and also will give an error message :

RangeError
Maximum call stack size exceeded

4. Please ignore this message and head over to change the url on the same tab in the browser

### Opening the websites News & Events page as a starting point

1. Append the url as mentioned below :

/news-and-events/

2. Now you will be able to see the News & Events page
3. Click on the navigation menu to go to Home
4. While on homepage take a base heap snapshot
5. Go again to News & Events page
6. Come back to Homepage
7. Repeat this for few times
8. Again take a heap snapshot

**Finally you will notice how the sizes of the snapshots of heap keeps increasing and if you do compare the snapshots you'll see lots of detached strings, DOM elements and other Nodes retaining a lot of memory which can't be freed**

### (For convenience, I am adding a Video of to recreate the memory leak problem)['https://']
