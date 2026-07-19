import { useEffect, useState } from 'react'
import './App.css'
import Cards from './Components/Cards'
import Buttons from './Components/Buttons'
import { Routes, Route, HashRouter } from "react-router-dom";


//import images
const humanoid = import.meta.glob('./assets/Humanoid/*.png', {eager:true, import:'default'});
const nonhumanoid = import.meta.glob('./assets/Non-Humanoid/*.png', {eager:true, import:'default'});

//format them
const format = (char, cat) => {
  //get file names to sort both folders alphabetically together
  return Object.keys(char).filter(path => path.endsWith('.png')).map((path, index) => {
    const basename = path.split('/').pop()
    const cleanFileName = basename.replace('.png', '');
  return{
    id: `${cat}-${index}`,
    url: char[path].default || char[path],
    category: cat,
    fileName: cleanFileName,
    name: ''
  }});
};

function App() {
  //sets active images to show
  const [images, setImages] = useState([]);
  //excludes categories
  const [excludeCat, setExcludeCat] = useState([]);
  //excludes cards
  const [exclude, setExclude] = useState([]);
  //to hide excluded cards
  const [hide, setHide] = useState(false);

  const categoryNames = ['Humanoid', 'Non-Humanoid'];
  //fetch the names file
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}names.json`)
      .then((res) => res.json())
      .then((namesArray) => {
        //mix images of both folders
        const allImages = [
          ...format(humanoid, 'Humanoid'),
          ...format(nonhumanoid, 'Non-Humanoid')
        ];

        //sorting images alphabetically
        const sortedImages = allImages.sort((a,b) => {
          const nameA = a.fileName || '';
          const nameB = b.fileName || '';
          return nameA.localeCompare(nameB, undefined, {numeric: true, sensitivity: 'base'})
        });

        //putting names on the images
        const imagewNames = sortedImages.map((img, index) => ({
          ...img, 
          name: namesArray[index] || img.fileName
        }));
        //set all images to show
        setImages(imagewNames);
      })
      .catch( (err) => console.error('Error fetching names', err));
    }, []);

  //toggles which category to exclude
  const toggleExcludeCat = (category) => {
    setExcludeCat((prev) => prev.includes(category) ? prev.filter((i) => i !== category) : [...prev, category]);
  }
  //resets the category filter and the excluded characters
  const reset = () => {setExcludeCat([]), setExclude([]), setHide(false)};
  
  //stores excluded characters
  const excluded = (id) => {
    setExclude((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);};

  //toggle hide the excluded characters
  const hideExcluded = () => {
    setHide((prev) => !prev);
  }

  const included = images.filter((char) => {
    const isCategoryExcluded = excludeCat.includes(char.category);
    const isCardGrayedOut = exclude.includes(char.id);
    if (isCategoryExcluded) return false;
    if (hide && isCardGrayedOut) return false;
    return true;
  });

  return (
    <>
      <div className="bg-mist-800 h-screen overflow-y-auto">
        <Buttons categoryNames={categoryNames} excluded={excludeCat} onToggle={toggleExcludeCat} reset={reset} hideToggle={hideExcluded} hidden={hide}/>
        <Cards characters={included} exclude={exclude} excluded={excluded}/>
      </div>
    </>
  )
}

export default App
