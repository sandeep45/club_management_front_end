## Moving on from vanilla react/redux

These are my learning notes on using react `create-react-app` with `react router-redux` v5.0 and `react-router` v4.2 

https://github.com/reactjs/redux/blob/master/README.md
https://redux.js.org/docs/recipes/index.html

## React Router Redux

Guide/Tutorial: https://reacttraining.com/react-router/web/example/basic

https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux

If component is not updating when you change the URL this is because you used redux and called connect on the component. Now it doesn't see that the url in the state has changed and therefore not udpating the react component even though the URL has changed. 
For more [read](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md) 

>`connect` creates components whose `shouldComponentUpdate` methods do a shallow comparison of their current props and their next props. Those components will only re-render when at least one prop has changed. This means that in order to ensure they update when the location changes, they will need to be given a prop that changes when the location changes.

> if you are running into this issue while using a higher-order component like `connect` (from react-redux), you can just wrap that component in a `withRouter` to remove the blocked updates.

`withRouter` adds the router to the props, so you can do `this.props.router`

https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md#blocked-updates

```
// redux before
const MyConnectedComponent = connect(mapStateToProps)(MyComponent)
// redux after
const MyConnectedComponent = withRouter(connect(mapStateToProps)(MyComponent))

App = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
```

> The primary way that a component can get access to the location is via a <Route> component. When a <Route> matches (or always if you are using the children prop), it passes the current location to the child element it renders.
>Render a pathless <Route>. While <Route>s are typically used for matching a specific path, a pathless <Route> will always match, so it will always render its component.

In my main `AuthenticationContainer.js` where I am building and mounting my application, I changed `<App/>` to `<Route component={App} />` so it always gets the `location` and therefore it re-renders.  

```
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route component={App} />
    </ConnectedRouter>
  </Provider>,
  target
);
```

When a components Url updates, I need to get the param from the URL and get the latest data.

`componentWillReceiveProps` vs `componentdidupdate`

## React Router

https://reacttraining.com/react-router/web/guides/philosophy
https://github.com/ReactTraining/react-router

[Quick Start Guide](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/quick-start.md)
the `params` inside the `render` method of the component and the `ownProps` inside `mapStateToProps` and `mapDispatchToProps` have access to `props.match`. Inside `match` you have `params`, `path` and `url`.

Using this we can see which model id is in reference in the restful route structure and load that. 

## React Bootstrap

https://react-bootstrap.github.io/
https://github.com/react-bootstrap/react-bootstrap

## Getting started Guide

https://medium.com/@notrab/getting-started-with-create-react-app-redux-react-router-redux-thunk-d6a19259f71f

#### Compose

Compose enables us to easily connect a number of functions together to build more complex functions.

http://busypeoples.github.io/post/functional-composing-javascript/


#### bindActionCreators

https://redux.js.org/docs/api/bindActionCreators.html

Use it to bind an action creator function or an object which has many action creator function to `dispatch`. So now when these functions are called they wrap their response as a param to `dispatch` and return the result of `dispatch`

e.g.
```
import { bindActionCreators } from 'redux'

const {dispatch} = props;

const x = () => {
 return {
   type: "Print",
   payload: "123"
 }
}

console.log(x);

const y = bindActionCreators(x, dispatch);

console.log(y);

x(); // return the object

y(); // returns the result of calling dispatch(x.apply(undefined, arguments));
```

`Apply` in this case will just call the function passing in the array of `arguments` as seperate parameters

To get `dispatch` from the props, I used `connect` to build a redux container which will automatically pass in the dispatch.

```
App = connect()(App)
```

And to make `connect` work when adding the `App` to the DOM, I passed in the `store`.

```
ReactDOM.render(<App store={store} />, document.getElementById('root'));
```

#### mapStateToProps

get `state` magically as a parameter, thanks to redux.

take data from the state, massage it or combine multiple streams of data, form your wanted data and then pass that down as a prop to your component.

#### mapDispatchToProps

get `dispatch` magically as a parameter, thanks to redux.
 
builds functions which call dispatch to fire actions which will update the store as seen fit by the reducer. these functions are passes down as props to the component.


#### push

an action creator provided by react-router-redux 
it build an action like this:

```
{
    type: '@@router/CALL_HISTORY_METHOD',
    payload: { 
      method: 'push',
      args: '/foo' 
    }
}

push("/foo")
```
https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux

An action is fired to change the location by using the action creator `push`. The reducer parses it and stores it in the redux state. The middleware also looks at this action and updates the history object which changes the browser url. All this is done and provided by `react-router-redux` whose middleware intenally uses `history`.

with `react-router-dom` offers the `Link` method which can be used to change the URL, it has the same exact effect as calling `push`, but the power of `push` is that its an `action`. So we can call it along with other actions.

## Using thunks

When writing an action creator function, make it return another function. this second returned function should accept `dispatch` as the first parameter. Now it can do what it pleases and then fire `dispatch` at its convenience. Now even though the first action creator is dispatched Now, the second inner function will take that `dispatch`, and then may do the actual `dispatch` a lot later.

```
export const incrementAsync = () => dispatch => {
  dispatch({
    type: INCREMENT_REQUESTED
  });

  return setTimeout(() => {
    dispatch({
      type: INCREMENT
    })
  }, 3000);
};
```

## WebUtil Crud Builder 

can have this?

## ActionCreator Builder

can have this?

## KeyMirror

is this still a thing?

## Managing Entities

are we still saying `RECIEVE_ENTITY` and putting everything together
https://github.com/reactjs/redux/blob/master/docs/basics/Reducers.md#note-on-relationships

#### normalizr
https://github.com/paularmstrong/normalizr
https://github.com/paularmstrong/normalizr/tree/master/docs
https://github.com/paularmstrong/normalizr/blob/master/docs/api.md

Using `schema` from `normalizr` to define the schemas
use short hand notation to define an array of entities
using `normalize` from `normalizr` to parse the response in the actions.

shall we denormalize data when fetching from the store rather than connecting data ourselves?

#### merge entities

Use lodash `merge` or transform-object-rest-spread `spread` operator
in terms of collision the right most key wins
does undefined key win over defined one?
https://davidwalsh.name/merge-objects

how to use es6 with polyphil in chrome console?

```
import merge from 'lodash/merge'

const x = {users: {1: {id: 1, f: "sandeep", l:"arneja"}, 2: {id: 2, f: "rod", l:"feu"}, 4: {id: 4, f: "jeff", l:"ery"}  }};
const y = {users: {1: {id: 1, f: "sandeep", l:"arneja"}, 3: {id: 3, f: "gabe", l:"x"}, 4: undefined }};

console.log({...x, ...y}); // has record 1, 3 & 4 as undefined
console.log(merge(x,y)); // has record 1, 2, 3 & 4 as the original one
```

With `merge` we get a recursive object merging, which is what we need. it also does not replace existing value with undefined. also does not do removal of values but will update to null. deep recursive merge, not just a shallow copy.

So using the spread operator is fine as long as we dont care for nested hashes. if we have nested data then we should use `merge`.

```
case K.MERGE_REPORTING:
  return _.merge({}, state, action.payload);
case K.UPDATE_REPORTING:
  return {
    ...state,
    ...action.payload
  };
```

Keep in mind that just using `merge` wont handle deletes.

https://github.com/reactjs/redux/tree/master/docs/recipes/reducers
https://davidwalsh.name/merge-objects
https://babeljs.io/docs/plugins/transform-object-rest-spread/
https://lodash.com/docs/#merge

#### reducer

- returns default value when previous state is undefined
- returns the previous state when it doesnt recoginze the action
- returns a new object based upon the changes made to the old state and the action

```
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
```

```
const myReducer = (previousState, action) => newState
```

#### Higher Order Functions

Functions which return other functions

```
const doAdditionWithExtraPadding = (num) => {
  return (a,b) => {
    return num + a + b;
  }
}

const cheatingAdd = doAdditionWithExtraPadding(5);
cheatingAdd(1,2); // 8 
``` 

#### Higher Order Reducers

A reducer which returns a reducer. Can take params or another reducer as an argument  

`combineReducers` is an example of a high order reducer as it takes a a hash of reducers and their slice name  and returns a new reducer. It internally then calls each reducer for every action and genreates the hash with responses from all of them.

```
theReducer = combineReducers({a: reducer1, b: reducer2})

function combineReducers(reducers) {
  return function (state = {}, action) {
    return Object.keys(reducers).reduce((nextState, key) => {
      // Call every reducer with the part of the state it manages
      nextState[key] = reducers[key](state[key], action)
      return nextState
    }, {})
  }
}
```

Lets say we want to create a reducer which take a payload hash and saves it to the state. When new data comes in it merges it in when its for the action it cares for. It also takes care of the edge cases like no payload, no state etc. This seems like the most common reducer. Rather creating this reducer every time, we can have a higher order reducer which generates this reducer for us. 

```
const aBasicReducerGenerator = (deafultState={}, validActionName) => {

  if(!validActionName) return () => deafultState

  return (state=defaultState, action) => {
  
      if (!action.payload) {
          return state;
      }
  
      switch(action.type){
        case validActionName:
          return {...state, ...action.payload}
        default:
          return state; 
      }
  }
};
```

Then we can use this basic reducer generator to generate reducers and combine them in to 1.

```
  const reporting = aBasicReducerGenerator({}, "RECEIVE_REPORTING");
  const imageProcessing = aBasicReducerGenerator({}, "UPDATE_IMAGE_PROCESSING");
  const myReducer = combineReducers({
    reporting,
    imageProcessing
  });
```

Another example is of a factory/HOR which returns a reducer which calls a specific caseReducer/function for a specific action as specified as key value pairs in the has. here the caseReducer/function is responsible for giving the new state for that case/action.

```
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
```
#### Making reducers better

https://github.com/reactjs/redux/blob/master/docs/recipes/reducers/RefactoringReducersExample.md

- extract out helper functions

- compose reducers
we create separate reducers for different domain items. then in a combined bigger reducer return a hash which calls the individual smaller reducers. the last part of combining can also be done by using `combineReducers`

- extract case reducers
this is like a mini reducer where we dont check for action type as it is used only for a specific type. we also dont check for edge cases like undefined previous state, unknown action etc.

- replace a reducer which has switch statements

a reducer which only uses switch statements for various cases and calls a case reducer can be built via a Higher order reducer which takes in initial state and hash representing the case actions and their corresponding case reducers.
 


 
#### Normalized Reducer

https://github.com/reactjs/redux/blob/master/docs/recipes/reducers/NormalizingStateShape.md
We can have on slice of the state called `entities` in it we can store all the tables we get from the backend individually normalized and they will refer to each other using ids.

```
state = {
  entities: {
      table1: {
        byId: {
        
        },
        allIds: [ ]
      },
      ... // other tables go here
  },
  ... // other slices of the state go here
}
```  

#### combining reducers

Redux gives us `combineReducers`. Below is an example showing what the output of combineReducers does:

```
const a = (state, action) => state; 
const b = (state, action) => state; 
combined_a_and_b = combineReducers({a,b});

function combined_a_and_b(state = {}, action) {
  return {
    a: a(state.a, action),
    b: b(state.b, action)
  };
}
```

## selectors

What is a selector?
- Selectors can compute derived data, allowing Redux to store the minimal possible state.
- Selectors are composable. They can be used as input to other selectors.

accessing data
deriving data
keeping them next to the reducer in the same file 
and having access to them from the index file which passes in just the right slice of state to them
they are regular functions and therefore need state to be passed in
mapStateToProps gets called when state changes
functions like `map` return a new array every time
rect does shallow comparison and will re-rerender

#### reselect
https://github.com/reactjs/reselect

```
let x = [].map( () => {} )
let y = [].map( () => {} )
x == y; // false
x === y; // false
```

```
import { createSelector } from 'reselect'

const campaignsReportingData = createSelector(
  [
    fromCampaign.getCampaigns,
    fromReporting.getReportingData
  ],
  (campaigns, reportingData) => {
    return (
      campaigns.map( c => reportingData[c.id] )
    );
  }
);
````

Derives the data by calling two selectors which return data from the state. It then passes that returned data as params to the `transform` function, which uses that data to return a new array. `creatorSelector` will memoize the values of the regular selectors and wont call the transform function if the values are the same as last time, instead it will just return the data it cached which was computed last time. therefore when this memoized selector is called multiple times it will return the exact same array if the data it is concerned with has not changed. Being the exact same array means it will look the same in the shallow match to react and therefore `render` wont be fired.

Same issue applies if you are changing the data for e.g. from a hash to an array. you are producing a new array which will cause re-rerenders

Since `createSelector` is returning a value based upon other values from the state, it is no different than a regular selector and can therefore be composed and more selectors can be created off it using it as an input selector.

Traditionally you will have `mapStateToProps` receive `state` & `ownProps` and then then in the function you call a normal selector. To the selector you can pass in the state and optionally something from the ownProps. The selector would then return the data you are looking for.

```
const mapStateToProps = (state, ownProps) => {
  const campaigns = fromCampaign.getCampaigns;
  const reportingData = fromReporting.getReportingData;
  return {
    campaigns,
    reportingData
  }
};
``` 

When we use `creatSelector` to build a selector, then if we pass in `props` along with state to the memoized selector, then it will pass the same to its input regular selectors

```
import { createSelector } from 'reselect'

const campaignsReportingData = createSelector(
  [
    fromCampaign.getCampaigns,
    fromReporting.getReportingData
  ],
  (campaigns, reportingData) => {
    return (
      campaigns.map( c => reportingData[c.id] )
    );
  }
);

const mapStateToProps = (state, ownProps) => {
  const crd = campaignsReportingData(state, ownProps) 
  return {
    crd
  }
};
``` 

The above wont memoize properly because `campaignsReportingData` has a cache size of 1. so everytime its called with a different prop value it will recompute. This means if we use this selector in multiple containers and initiate each container with different `props`, then when each container calls this selector it will be passing down different prop value. Since the selector has a cache size of 1, this means it will recalculate every time

```
<CampaignContainer cid=1 />
<CampaignContainer cid=2 />

CampaignContainer = connect((mapStateToProps, mapDispatchToProps)(CampaignTable);

const mapStateToProps = (state, ownProps) => {
  const crd = campaignsReportingData(state, ownProps); 
  return {
    crd
  }
}

```

In the example above we are passing `ownProps.cid = 1` and then `ownProps.cid = 2` and the same exact `state`. This wil cause it recalculate and not cache correctly.

Instead we need to return a new memoized selector for each container.

>To share a selector across multiple container instances while passing in props and retaining memoization, each instance of the container needs its own private copy of the selector.

>If the `mapStateToProps` argument supplied to `connect` returns a function instead of an object, it will be used to create an individual `mapStateToProps` function for each instance of the container. 

```
import { createSelector } from 'reselect'

const createCampaignsReportingDataSelector = () => {
  return campaignsReportingData();
}

const campaignsReportingData = createSelector(
  [
    fromCampaign.getCampaigns,
    fromReporting.getReportingData
  ],
  (campaigns, reportingData) => {
    return (
      campaigns.map( c => reportingData[c.id] )
    );
  }
);

const makeMapStateToProps = () => {
  const campaignsReportingDataSelector = createCampaignsReportingDataSelector();
  const mapStateToProps = (state, props) => {
    return {
      todos: campaignsReportingDataSelector(state, props)
    }
  } 
  return mapStateToProps;
};

CampaignContainer = connect((makeMapStateToProps, mapDispatchToProps)(CampaignTable);
```  

>If we pass `makeMapStateToProps` to connect, each instance of the `CampaignContainer` will get its own `mapStateToProps` function with a private `campaignsReportingDataSelector` selector. Memoization will now work correctly regardless of the render order of the VisibleTodoList container

`createSelector` when called `()` produces and returns a selector like a normal one you would write which accepts state as a parameter. it then calls the input selectors provided to `createSelector` as the initial params. it calls them with state and get their response. compares their response with last response. if different it then calls the last function provided as input to it. in this function you have your normal selector logic which returns new value. 

#### deleting data in the reducer

maybe dont remove from reducer but maintain a seperate list of ids which have been deleted and then when we are fetching just dont read those.

## configuring environment variables

Using a `.env` file and setting up variables starting with `RACK_APP` and then accessing them as `process.env.REACT_APP_VAR1`

how about separating PRODUCTION vs DEVELOPMENT variables?

https://medium.com/@tacomanator/environments-with-create-react-app-7b645312c09d 
 
 ## rack-cors
 
do not send `credentials` header as part if the request from the front end as it prevents doing `*` for `origins` in the response.

```
// axios.defaults.withCredentials = true;
```

```
config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*', :headers => :any, :methods => :any
      end
    end
``` 

## hydrating store

are we still this manually or do we prefer a npm package now?

## JBuilder

we still using it?
how are we building our responses?

## RoadMap
- add bootstrap - DONE
- add Page to display all clubs - DONE
- setup selectors - DONE
- add Page to display club, get club id from state/router - DONE
- add Page to create club - DONE
- add Page to update club - DONE
- add Button & Modal to delete a club - DONE
- add Authentication & update WebUtil - DONE
  - sign in - DONE
  - sign up - LATER
  - reset password - LATER
  - sign out - DONE
- add bootstrap 
  - layout - DONE
  - nav - DONE
  - modal - DONE
  - form - DONE
  - table - DONE
  - button - DONE
- setup propTypes - DONE
- notification system
  - login error
- navigation actions
- creates need to update relationship so parent knows that a new child is here. same applies if a new relationship is built.
make components which have an `id` in url, fetch what they need in case its not already in the state

sign in
form with username and password
call action to do log in -> calls web util
response updates webutil default
dispatch normalized owner, clubs & members 

intersting proble,

using a form and action is not working
 - its posting, the HTML is
 - you dont see the ajax call in network tab coz preserve log is not enabled

empty the state reducer/action  
persist to prevent refresh issue

redirect to "sign in" page on 401 error

make all actions do a common redirect

using addressbar to change URL should not log out.

deletion can be handled on the front end
creation, we must add to the parent otherwise it wont show up

replace alerts with generic error Modal

-- checkins dashboard -- 

re-fetch todays checkins -> call to get checkins of today on a club with memebers and their checkins - DONE
also called on checkins page load -> DONE
selector to get checkins of today - DONE
show checkins of today - DONE
do checkin - via QR scanning - continuous - DONE
confirm checking - ask for fee / reject / already checked in - DONE
find member - DONE
delete a checkin - DONE

top bar has members button - DONE
top bar has Checkins Dashbaord button - DONE 
to manual checkin get all members page and do manual checkin - DONE

problem
club doesnt have checkins
club has members

normalizer
makes more sense to always print top to bottom
if u do bottom to top, then the bottom has to include the top, which then has to include the bottom, but if there are many bottoms then u re writting all of them again and again.

Object.assign copys reference over for nested items
```
a = {b : {c : "number"} }
{b: {…}}
copy = Object.assign({}, a)
{b: {…}}
copy === a
false
delete copy.b.c
true
a
{b: {…}}b: __proto__: Object__proto__: Object
a.b.c
undefined
copy.b.c
undefined
```

One solution is not use `Object.assign` when building a new copied object. Instead use merge as it copies everything over, not just top object.

```
a = {b: {c: "number"} }
{b: {…}}
copy = _.merge({}, a)
{b: {…}}
a === copy
false
a.b.c
"number"
copy.b.c
"number"
delete copy.b.c
true
copy.b.c
undefined
a.b.c
"number"
```

gotcha for momement
`moment(undefined).isSame(moment(), 'day'); // true`
my fix
`moment(undefined || null).isSame(moment(), 'day'); // false`

sound files
http://soundbible.com/tags-error.html
converting to base 64
https://www.base64encode.org/

happens to be displaying all the members in the UI under a club which has 0 members - DONE 
now fetch members of the clubId in URL

when backend deletes a checkin we need to replace all checkins with new ones - DONE
done by doing replaceEntity in state than merge state
but now we have clubs which have members but the members have been removed as they didnt check in today
so when looping over members i am removing the null items
