import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, history }) => {
  // console.log(colors);
  const [ editing, setEditing ] = useState(false);
  const [ colorToEdit, setColorToEdit ] = useState(initialColor);
  const [ newColor, setNewColor ] = useState({
    color: '',
    code: {
      hex: ''
    }
  })
 
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };
  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log('Edit res', res)
        updateColors(
          colors.map(col => {
            if(col.id === res.data.id){
              return res.data
            } else {
              return col
            }
          })
        );
      })
      .catch(err => {
        console.log('could not edit', err)
      })
  };
  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        console.log('color deleted', res)
        updateColors(colors.filter(col => col.id !== res.data))
      })
      .catch(err => {
        console.log('Could not delete color', err)
      })
  };
  const handleNewSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/colors', newColor)
      .then(res => {
        console.log('new color has been posted', res)
        updateColors(res.data)
        setNewColor({
          color: '',
          code: {
            hex: ''
          }
        })
      })
      .catch(err => {
        console.log('could not post new color', err)
      })
  };
  const logout = () => {
    localStorage.removeItem("token");
    history.push('./')
 };
  return (
    <div className="colors-wrap">
      <button onClick={logout}>Logout</button>
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={handleNewSubmit}>
        <h3>Add a New Color!</h3>
        <div>
          <label>Color Name</label>
          <input 
          type='text'
          name='color'
          onChange={e => {
            setNewColor({
              ...newColor,
              color: e.target.value
            })
          }}
          value={newColor.color}/>
        </div>
        <div>
          <label>Hex Code</label>
          <input 
          type='text'
          name='hex'
          onChange={e => {
            setNewColor({
              ...newColor,
              code: {
                hex: e.target.value
              }
            })
          }}
          value={newColor.code.hex}/>
        </div>
        <button>Submit!</button>
      </form>
    </div>
  );
};

export default ColorList;
