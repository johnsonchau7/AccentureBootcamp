import React, { useState, useEffect, useContext } from 'react';
import Container from '@material-ui/core/Container';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import { ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../context/FoodContext';
import Grid from '@material-ui/core/Grid';
import { grey } from '@material-ui/core/colors';
import _ from 'lodash';
const useStyles = makeStyles(theme => ({
    root: {
      display: 'contents',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },    
    pref: {
        backgroundColor: 'lightgray',
        borderRadius: '5'
    },
    prefContainer: {
        marginTop: "5px"
    },
    selected: {
        //border:  '2px solid lightgreen',
        color: 'white',
        backgroundColor: 'lightgreen !important',        
        fontWeight: '700'
    },
    unselected: {
        border:  '2px solid lightgreen',
        color: 'lightgreen',
        fontWeight: '700',
        backgroundColor: 'white !important'
    }
  }));

const dietPrefsList = ['vegan', 'vegetarian', 'peanut-free', 'tree-nut-free', 'alcohol-free'];

const SearchBox = () => {
    const [ dietPrefs ,setDietPrefs ] = useState([]);
    const classes = useStyles();
    const [ searchItems, setSearchItems ] = useState([]);
    const [currentItem, setCurrentItem ] = useState('');
    const { state, IngredientsPopulate, Search } = useContext(Context);
    useEffect(() => {
        IngredientsPopulate();
    },[]);
    console.log('pre state: ,', state);
    return ( 
        <Container maxWidth="lg" style={{paddingLeft: 0, paddingRight: 0}}>
            <Autocomplete label="Enter your ingredients" fullWidth 
                autoSelect={true}
                options={state.autoCompleteIngredients !== undefined ? state.autoCompleteIngredients.data : [] }
                getOptionLabel={option => option}
                value={currentItem}
                freeSolo
                onChange={event => {
                    
                    if (event.currentTarget.textContent != '') {
                        setCurrentItem(event.target.value)
                        setSearchItems([...searchItems, currentItem]);
                        setSearchItems(_.uniq(searchItems));
                    }
                }}
                renderInput={params => (
                    <TextField 
                        {...params} value={currentItem} onChange={setCurrentItem(currentItem)} label="Tell us whats in ya cupboard..." variant="outlined" fullWidth 
                    /> 
                    )
                }
                onKeyPress={(key) => {
                    if (key.key =="Enter" && currentItem != '') {
                        setCurrentItem(currentItem);
                        setSearchItems([...searchItems, currentItem]);    
                        Search([...searchItems, currentItem], dietPrefs);
                        setCurrentItem('');
                    }
                }}
            />
            <List className={classes.prefContainer} style={{display: 'flex', overflow: 'scroll'}}>
                <ListItem className={classes.root}>
                    <h4 className="h4-centered">Dietary Preferences</h4>
                </ListItem>
                {dietPrefsList.map(function(item) {
                    if (dietPrefs.length !== 0 ) {
                        if (dietPrefs.includes(item)) {
                    return (
                        <ListItem className={classes.root}>    
                            <Chip 
                                label={item}
                                className="chipPurple selected"
                                onClick={(me) => setDietPrefs(dietPrefs.filter(function(item) {
                                    return item !== me.target.textContent;
                                }))}
                            />
                        </ListItem>
                    );
                } else { 
                    return (
                       <ListItem className={classes.root}>    
                            <Chip 
                                label={item}
                                className="chipPurple unselected"
                                onClick={(me) => {setDietPrefs([...dietPrefs, me.target.textContent])}}
                            />
                        </ListItem>
                    )
                }
            
            } else { 
                    return (
                        <ListItem className={classes.root}>    
                            <Chip 
                                label={item}
                                className="chipPurple unselected"
                                onClick={(me) => {setDietPrefs([...dietPrefs, me.target.textContent])}}
                            />
                        </ListItem>
                    )
                }
                })}
            </List>
            <List style={{marginBottom: "6px"}}>
                {searchItems.map( el => {
                    return (
                        <ListItem className={classes.root}>
                            <Chip 
                                label={el} 
                                key={el}
                                className="searchItemChip"
                                onDelete={(ele) => {  setSearchItems(searchItems.filter(function(item) {
                                    return item !== el;
                                }))}}
                            />
                        </ListItem>
                    )
                })}
            </List>
        </Container>
    )   
}

export default SearchBox;