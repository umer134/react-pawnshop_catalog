import { useEffect, useState } from 'react';
import { instance } from './service/api/index.js';
import Products from './components/Products';
import './App.css'
import Pagination from './components/Pagination';

function App() {
const [data, setData] = useState([])
const [prods, setProds] = useState([])
const [brandVal, setBrandVal] = useState('')
const [nameVal, setNameVal] = useState('')
const [searchPrice, setSearchPrice] = useState('')
const [loading, setLoading] = useState(false)
const [currentPage, setCurrentPage] = useState(1)
const [productsPerPage] = useState(50)

useEffect(() => {
  async function getData(){
    setLoading(true)
   const prodIds = await instance.post('/', {
      'action': 'get_ids',
      'params': {
          'offset': 0,
          // 'limit': 500,
      },
  })
  const fields = prodIds.data.result.reduce((acc, item)=>{
    if(item !== null){
      acc.push(item)
    }
    return acc
  }, [])

  const items = await instance.post('/', {
    'action': 'get_items',
      'params': {
          'ids': [...fields]
      },
  })

  const items1 = items.data.result.reduce((obj, ind) => {
    if(!obj.find(v => v.id == ind.id) && ind.brand !== null ){
      obj.push(ind)
    }
    return obj
  }, [])
  setData(items1)
  setProds(items1)
    setLoading(false)

  }
  getData()
}, [])

function filterByPrice(value){ 
  setCurrentPage(1)
  if(value == 0){ 
    return setProds(data)
  }else{
     const copy = data.filter((item) => item.price == value)
    setProds(copy)
  }
}

function filterByBrand(value){
  setCurrentPage(1)
  setBrandVal(value)
  const copy = data.filter((item) => item.brand.toLowerCase().includes(value))
  setProds(copy)
}

function filterByName(value){
  setCurrentPage(1)
  setNameVal(value)
  const copy = data.filter((item) => item.product.toLowerCase().includes(value))
  setProds(copy)
}

function cancelFilter(){
  setBrandVal('')
  setNameVal('')
  setSearchPrice('')
  setProds(data)
}

const lastProductIndex = currentPage * productsPerPage;
const firstProductIndex = lastProductIndex - productsPerPage;
const currentProduct = prods?.slice(firstProductIndex, lastProductIndex);


const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='App'>
      <h1 className='catalog-title'><span>Каталог </span>
         ювелирных украшений
        </h1>
      <div className='inp-filters'>
        <div className='price-inp'>
        <input type="number" placeholder='искать по цене' 
        value={searchPrice} 
        onChange={(e) => setSearchPrice((e.target.value))}/>
        <button onClick={() => filterByPrice(searchPrice)}>поиск</button>
        </div>
        <div className='brand-inp'>
          <input type="text" placeholder='искать по бренду' 
          value={brandVal}
        onChange={(e) => filterByBrand((e.target.value))}/>
        </div>
        <div className='name-inp'>
          <input type="text" placeholder='искать по названию' 
          value={nameVal} 
        onChange={(e) => filterByName((e.target.value))}/>
        </div>
        <button onClick={() => cancelFilter()}>очистить</button>
      </div>

      <div className='cards'>
      <Products data={currentProduct} loading={loading}/>
      </div>
      <div className='pag-btns'>
      <Pagination data={currentProduct} loading={loading}
      productsPerPage={productsPerPage}
      currentPage={currentPage}
      paginate={paginate}
      totalProducts={prods.length}/>
      </div>
    </div>
  )
}

export default App