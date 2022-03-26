import { createContext, useState, useEffect,useReducer } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataReducer from './DataReducer';
toast.configure()

const initialState={
	items: [],
	toEdit: null
}

const DataContext = createContext()
export const DataProvider = ({ children }) => {

	const [state,dispatch]= useReducer(DataReducer,initialState)
     
	
	// const [items, setItems] = useState([])
	// const [toEdit, setToEdit] = useState(null)

	useEffect(() => {
		fetchItems()
	}, [])

	const fetchItems = async () => {
		const res = await fetch('http://localhost:5000/api/items')
		const data = await res.json()
		//setItems(data)
		dispatch({type: 'SET_ITEMS',payload: data.items})
	}
	const addItem = async (item) => {
		const res = await fetch('http://localhost:5000/api/items', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(item),
		})
		const data = await res.json()
		dispatch({type:'ADD_ITEM',payload: data.item})
		// setItems([...items, data])
		toast.success('Item Added')
	}
	const deleteItem = async (id) => {
		await fetch(`http://localhost:5000/api/items/${id}`, {
			method: 'DELETE',
		})
		// setItems(items.filter((item) => item.id != id))
		dispatch({type: 'DELETE_ITEM',payload:id})
		toast.error('Item Deleted')
	}
	const editItem = (item) => {
		dispatch({type:'SET_TOEDIT',payload:item})
		// setToEdit(item)
	}
	const updateItem = async (newItemData) => {
	const res =	await fetch(`http://localhost:5000/api/items/${newItemData.id}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(newItemData),
		})
		const data= await res.json()
		console.log(data)
		dispatch({type:'UPDATE_ITEM', payload: data.updatedItem})
		dispatch({type: 'RESET_TOEDIT'})
		// setItems(
		// 	items.map((item) => (item.id === newItemData.id ? newItemData : item))
		// )
		// setToEdit(null)
	}

	return (
		<DataContext.Provider
			value={{
				items: state.items,
				toEdit: state.toEdit,
				addItem,
				editItem,
				updateItem,
				deleteItem,
			}}
		>
			{children}
		</DataContext.Provider>
	)
}
export default DataContext
