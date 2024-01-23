/*================================================================
    This exercise will implement a feature that will enable Search component
 to remember the most recent searched. 

    Let's implement this feature by using a side-effect to store the recent search 
 from the browser's local storage and retrieve it upon the initial component 
 initialization. First, use the local storage to store the searchTerm accompanied
  by an identifier whenever a user types into the HTML input field:

    What is useEffect?
      - Use useEffect Hook to trigger the desired side-effect each time 
     the searchTerm changes:
=============================================*/

import * as React from 'react';
 
 // Eliminate "return" statement and enclosing bracket if no business 
 //business logic. Otherwise retain the {} and put a "return" statement
 const App = () => { 
     
      const stories = [
        {
          title: 'React',
          url: 'https://reactjs.org/',
          author: 'Jordan Walke',
          num_comments: 3,
          points: 4,
          objectID: 0,
        },
        {
          title: 'Redux',
          url: 'https://redux.js.org/',
          author: 'Dan Abramov, Andrew Clark',
          num_comments: 2,
          points: 5,
          objectID: 1,
        },
       ]

       //Refactor this see line 41
       //const [searchTerm, setSearchTerm] = React.useState('React');

       //Using 'search' as key fetch the value in the localstorage otherwise 
       //use 'React' as default state
       const [searchTerm, setSearchTerm] = React.useState(
        localStorage.getItem('search') || 'React'
       );

       //React's useEffect Hook takes two arguments: 
       //    1. The first argument is a function that runs our 
       //     side-effect. Example: localStorage.setItem('search', searchTerm)
       //    2. Dependency array of variables: [searchTerm]); 
       //
       //In our case, the side-effect function stores searchTerm into 
       //the browser's local storage. The second argument is a dependency
       //array of variables [searchTerm]. If one of these variables changes, 
       //the function for the side-effect is called. In our case, 
       //the function is called every time the searchTerm changes 
       //(e.g. when a user types into the HTML input field). 
       React.useEffect(() => {
        console.log('Typed something into textbox. useEffect fired. ' +
            ' Dependency Array= ' + [searchTerm]); //experiment with hook dependency array
       /* localStorage.setItem('search', searchTerm); //<- use effect is 
                  //called initially when component renders for the 
                  //first time and whenever the user types something in 
                  //the input text box*/
       }, [searchTerm]); //<-- Dependency array of variables. 
                         //React.useEffect is triggered when 
                         //this dependency variable changes. In our
                         //case when a user types into the HTML 
                         //input field)
                         //Leaving out the second argument
                         //would make the function for the side-effect 
                         //run on every render (initial render and 
                         //update renders) of the component 

      const handleSearch = (event) => {
          setSearchTerm(event.target.value); //store the value in the state updater function - setSearchTerm.
           /*localStorage.setItem('search', event.target.value);  refactor with line 44*/
        };
       
      const searchedStories = stories.filter((story) =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return (
        <div>
          <h1>My Hacker Stories</h1>
    
          <Search search={searchTerm} onSearch={handleSearch} />
    
          <hr />
    
          <List list={searchedStories} />
        </div>
      );
    }

    //Note: Omit the function body (e.g no return statement)
    const Search = ({search, onSearch}) => ( //<--Destructrure the props right inside the function signature
      <div>
        <label htmlFor="search">Search: </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={onSearch}
         />
      </div>
      )   //EOF Search component  
  
   //Omit the function's block body of the component again.
   const List = ({list}) => (  //<-- destructure objects in the function signature.
    <ul>
       {list.map((item) => (
         <Item key={item.objectID} item={item} />
       ))}
    </ul>
  ); //EOF
     
 
  //This component called "Item" encapsulates the task of displaying 
  //each stories' record
  const Item = ({item}) => (   
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
    </li>
  );   

    
export default App;

//========================================================== 
//Note on Map:
 //Within the map() method, we have access to each object and its properties.
 
 //useState
 //By using useState, we are telling React that we want to have a 
 //stateful value which changes over time. And whenever this stateful value 
 //changes, the affected components (here: Search component) 
 //will re-render to use it (here: to display the recent value).