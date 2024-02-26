const Products = ({data, loading}) => {
    
    if(loading){
        return <h2>Загрузка каталога...</h2>
    }
    if(data <= 0){
        return <h2>Товар не найден</h2>
    }
    
    return ( 
            <>
            {data?
                data.map((item, index) => {
                 return (
            <div className="product" key={index}>
            <h2>Товар № {index + 1}</h2>
            <div className="container">
            <p className="id">{item.id}</p>
            <h3>{item.product}</h3>
            <p className="brand">Бренд: <span>{item.brand}</span> </p>
            <p className="price">{item.price.toLocaleString('ru', {style: 'currency',currency: "rub"})}</p>
            </div>
            </div>) 
                })
                :
                null}
            </>
            
        
       
     );
}
 
export default Products;