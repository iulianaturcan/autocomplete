1. What is the difference between Component and PureComponent? Give
an example where it might break my app.

The difference between Component and PureComponent is that PureComponent has an optimization check for rendering. PureComponent will render if the props or state have changed. On the other hand, Component always renders when the parent component renders.

An example where it might break the app is when you are using PureComponent and you are changing an mutable object (array or object) dirrectly in the place where you are taking it as a props. In this case, React will not detect the change and will not re-render the component, because it is relying on the reference check of the object, not on its values. 

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

Context + ShouldComponentUpdate might be dangerous used together, because:
- it can lead to exagerated rerendering of the components. If a component depends on a value from the context and does not implement a correct logic in the shouldComponentUpdate method, it can rerender frequently, even if the value from the context is not changing;
- it can affect the stability of the app. For example, rerendering of a compnent can be overwriten by the updates from the context, which can lead to unexpected behaviour or hard to debug.

3. Describe 3 ways to pass information from a component to its PARENT.

Here are the 3 ways to pass information from a component to its PARENT:
- using props. The parent component can pass functions to the child component as props and then the child can call this function and pass the information to its parent;
- using context api. The context allows us to store there a value and then we can access it from any child component without passing it as a prop.
- using state management libraries: redux, recoil, Zustand, etc. These libraries allow us to store the state in a global store and then we can access it from any component without passing it as a prop.

4. Give 2 ways to prevent components from re-rendering.

For preventing components from re-rendering we can use:
- React.memo() wraps the component and memoizes its result. It will trigger a rerender only if the props have changed;
- useMemo and useCallback hooks can also be used for memoizing the result of a function, useMemo will return the result of the function and useCallback will return the function itself.

5. What is a fragment and why do we need it? Give an example where it might
break my app.

Fragment is a special element in React that doesn't create a DOM node. We need it when we want to return multiple elements without creating an additional container (div for example).

It might break the app when we are using a fragment inside a map method and we are not providing a key for the fragment. If we are want to provide a key, we should write it like this ```<React.Fragment key={key}>```.

6. Give 3 examples of the HOC pattern.

Here are 3 examples of the HOC pattern:
- withAuth (authentification) - checks if the user is logged in and if not redirects him to the login page;
- withRouter (navigation) - gives acces to the history object, location and match to manipulate the navigation and to give information about the current route (url);
- connect() - a function that connects a React component to a Redux store, it provides the state and the dispatch function to the component.

7. What's the difference in handling exceptions in promises, callbacks
and async...await?

The diference in handling exceptions in promises, callbacks and async...await is that:
- promises are an old way of handling asynchronous code and they are not so easy to read and write; they are using the .then() and .catch() methods;
- callbacks are also an old way of handling asynchronous code and they are not so easy to read and write. They are using the callback hell pattern;
- async...await is a new way of handling asynchronous code and it is using promises under the hood. It is using the try...catch block to handle exceptions.

All 3 of them can handle exceptions, it depends on the teams preference which one to use, but async...await is the most used and popular one.

8. How many arguments does setState take and why is it async.

setState can take 2 arguments, the object with the new state and a callback function. The callback function is called after the state is updated.

setState is async, because of the performance and efficiency. When we are calling setState, React is not updating the state immediately, but it is putting it in a queue to wait for previous state updates to finish. This thing allows React to make the updates and to combine multiple updates in a single render, which is more efficient.

9. List the steps needed to migrate a Class to Function Component.
---
1. Identify the state and the methods of the component 
2. Create a function component
3. Remove the constructor, this.state and this.setState and replace them with useState hook
4. Remove the lifecycle methods and replace them with useEffect hook
    1. componentDidMount -> useEffect(() => {}, [])
    2. componentDidUpdate -> useEffect(() => {}, [state])
    3. componentWillUnmount -> useEffect(() => { return () => {} }, [])
5. Clean up the code by removing thhis and make sure that the component is accepting props as an argument and returns JSX
6. Test the functionality of the component
---
10. List a few ways styles can be used with components.

In React we can use styles with components in a few ways:
- inline styles ```style={{color: 'red'}}```;
- using a css class ```className="red"``` and importing the css file;
- using styled components, it is a library that allows us to write css in js;
- using css preprocessors like sass or less that comes with additional features like variables, mixins, nesting etc;

11. How to render an HTML string coming from the server.

To render an HTML string coming from the server we can use dangerouslySetInnerHTML prop. This prop accepts an object with a __html key and the value is the HTML string. 

Example: ```<div dangerouslySetInnerHTML={{__html: htmlString}}></div>```