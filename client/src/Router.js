import React from 'react'
import { Switch, Route } from 'react-router'
import Home from './components/Home'
import MealPlan from './components/Mealplan'
import BodyComp from './components/BodyComp'
import Login from './components/Login'
import Register from './components/Register'

// const checkAuth = () => {
//     const token = localStorage.getItem("token")
//     return token[0] ? true : false
// }

// const ProtectedRoute = ({component: Component, ...rest}) => {
//     return (
//       <Route
//         {...rest}
//         // define the value of the render method as a ternary that checks to see if checkAuth returns true or false
//         render={(props) => checkAuth() === true
//             // if true render the component with all the props
//             ? <Component {...props} />
//             // if false, use the Redirect component to update the url to `/login` so they are redirected to the login component
//             : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
//       />
//     )
//         }



const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Register} />
            <Route path="/bodycomp" component={BodyComp} />
            <Route path="/mealplan" component={MealPlan} />
            <Route path="/login" component={Login} />
        </Switch>
    );
};

export default Router;