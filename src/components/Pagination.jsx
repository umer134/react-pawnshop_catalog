import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

const Pagination = ({loading, data,  productsPerPage, totalProducts, paginate, currentPage }) => {
   
    if(loading){
        return null
    }
    if(data <= 0){
        return null
    }

    return (
        <div>
            <ResponsivePagination
            current={currentPage}
            total={Math.ceil(totalProducts/productsPerPage)}
            onPageChange={paginate}/>
        </div>
    );
}

export default Pagination;