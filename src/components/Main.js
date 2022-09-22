import React, { useEffect, useState } from 'react';

const Main = () => {
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [res, setRes] = useState([]);
    const [item, setItem] = useState([]);

    // Category 
    useEffect(() => {
        fetch('https://dua-backend.herokuapp.com/dua-main/category')
        .then(res => res.json())
        .then(data => setCategory(data.result))
    }, [])
    
    // subCategory 
    useEffect(() => {
        fetch('https://dua-backend.herokuapp.com/dua-main/sub-category')
        .then(res => res.json())
        .then(data => setSubCategory(data.result))
    }, [])
    
    const subCat = (id) => {
        console.log("its working", id);
        const result = subCategory.filter(i => i?.cat_id === id)
        setRes(result);
    }

    const items = (id) => {

        fetch(`https://dua-backend.herokuapp.com/dua-main/dua/${id}`)
        .then(res => res.json())
        .then(data => setItem(data.result))
    }

    return (
    <div className='m-6 bg-green-100 d-flex'>
        {/* sidebar  area*/}
        <div style={{width:"300px"}}>
            <div class="accordion" id="accordionExample">
                {
                    category.length > 0 && category.map(i =>(
                        // <p>{i.cat_name_en}</p>
                        
                        <div class="accordion-item">
                            <h2 class="accordion-header" id={`heading${i?.id}`}>
                                <button onClick={() => subCat(i.id)} class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i?.id}`}aria-expanded="true" aria-controls={`collapse${i?.id}`}>
                                    <div className='d-flex'>
                                        <div>
                                            <p className='text-sm'>{i?.cat_name_en}</p>
                                            <small>Subcatagory: {i?.no_of_subcat}</small>
                                        </div>
                                        <div className='ms-5'>
                                            <small> {i?.no_of_dua} <br /> <span className='font-bold'>Duas</span></small>
                                        </div>
                                    </div>
                                </button>
                            </h2>
                            <div id={`collapse${i?.id}`} class="accordion-collapse collapse show" aria-labelledby={`heading${i?.id}`} data-bs-parent="#accordionExample">
                                {
                                    res.length > 0 && res.map(i => (
                                        <div class="accordion-body">
                                            <strong onClick={()=>items(i.subcat_id )}>{i?.subcat_name_en}</strong>
                                             
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
                
            </div>
        </div>
            {/* content area  */}
            
        <div style={{width:'200px', borderRight:'1px solid black'}}>
            {
                item.map(i => (
                    <p>{i.dua_name_en}</p>
                ))
            }
        </div>
    </div>
    );
};

export default Main;