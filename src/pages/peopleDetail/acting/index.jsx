import { useEffect, useState } from "react"
import { peopleApi } from "../../../services/peopleApi";
import { Link } from "react-router";
const productCategoryOptions = [
    { value: "all", text: "All" },
    { value: "movie", text: "Movie" },
    { value: "tv", text: "TV" },
  ];
  const departmentOptions = [
    { value: "all", text: "All" },
    { value: "acting", text: "Acting"},
    { value: "production", text: "Production" },
    { value: "sound", text: "Sound"},
  ];
export const Acting=({personId})=>{
    const [movieCredits, setMovieCredits]=useState();
    const [tvCredits, setTvCredits]=useState();
    const [ productCategory, setProductCategory]=useState(productCategoryOptions[0].value);
    const [ department, setDepartment]=useState(departmentOptions[0].value)

    const handleFetchTvCredits=async()=>{
        const response=await peopleApi.getTVCredits(personId)
        if(response){
            setTvCredits(response)
        }
    }
    const handleFetchMovieCredits=async()=>{
        const response=await peopleApi.getMovieCredits(personId)
        if(response){
            setMovieCredits(response)
        }
    }
    const handleChangeProductCategory = (event) => {
        setProductCategory(event.target.value);  
    };
    const handleChangeDepartment = (event) => {
        setDepartment(event.target.value);  
    };
    const handleGetCrew=(category, department)=>{
        const movieCastAdded=movieCredits?.cast.map(movie=>{ 
            movie.media_type='movie';
            movie.to='/movie/detail/'+movie.id;
            movie.department='acting'
            movie.release_year=movie.release_date !==''? new Date(movie.release_date).getFullYear() : 9999;   
            return movie
        }) ?? []
        const tvCastAdded=tvCredits?.cast.map(tv=>{ 
            tv.media_type='tv';
            tv.to='/tv/detail/'+tv.id;
            tv.department='acting'
            tv.release_year=tv.first_air_date !==''? new Date(tv.first_air_date).getFullYear() : 9999;   
            return tv
        }) ?? [];
        let castData=movieCastAdded.concat(tvCastAdded);
        if(category !== 'all'){
            castData=castData.filter(movie=> movie.media_type === category)
        }
        const movieCrewAdded=movieCredits?.crew.map(movie=>{ 
            movie.media_type='movie';
            movie.to='/movie/detail/'+movie.id
            movie.release_year=movie.release_date !==''? new Date(movie.release_date).getFullYear() : 9999;   
            return movie
        }) ?? []

        const tvCrewAdded=tvCredits?.crew.map(tv=>{ 
            tv.media_type='tv';
            tv.to='/tv/detail/'+tv.id;
            tv.release_year=tv.first_air_date !==''? new Date(tv.first_air_date).getFullYear() : 9999;   
            return tv
        }) ?? []
        let crewData=movieCrewAdded.concat(tvCrewAdded);
        if(category !== 'all'){
            crewData=crewData.filter(movie=> movie.media_type === category)
        }
        if(department !== 'all'){
            crewData=crewData.filter(movie=> movie.department === department);
        }
        return crewData;
    }

    const handleDivideByYear=(movies)=>{
        const movieYear=Array.from(new Set(movies.map(movie=> movie.release_year))).sort((a, b) => b - a);

        const movieDividedByYear=movieYear.map(year=>{
            return{
                year:year,
                movies:movies.filter(movie=> movie.release_year === year)
            }
        })
        return movieDividedByYear;
    }
    const handleRenderRow=()=>{
        if( department !== 'Acting'){ 
            return (<>
            <div className="text-[25px] font-bold">{department}</div>
            <div className="flex flex-col gap-2">
                {handleDivideByYear(handleGetCrew(productCategory,department)).map(item=>{
                    const {year, movies}=item;
                    return(
                        <div className="flex gap-2 border-b-1">
                            <div className="w-[50px] py-1">{year !== 9999 ? year : '?'}</div>
                            <div className="flex flex-col gap-2 py-1">
                                {movies.map(movie=>{
                                    const {id, to, media_type, job}=movie;
                                    return(
                                        <div key={id+media_type}>
                                            <Link to={to} className="font-bold text-[15px]"> {media_type ==='movie' ? movie.original_title : movie.original_name}</Link>
                                            <div className="text-[10px]"><span className="text-gray-500">...</span> {job}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                }) }
            </div>
        </>)}
        if(department ==='All'){
            ['Acting', 'Production', 'Sound'].map(item=> 

            )
        }
    }
    useEffect(()=>{
        if(!movieCredits){
            handleFetchMovieCredits()
        } 
        if(!tvCredits){
            handleFetchTvCredits()
        }
    },[personId])
    useEffect(()=>{
        // console.log('cast',handleGetCast(productCategory))
        // console.log('crew',handleGetCrew(productCategory,"all"))
        const cast= handleDivideByYear(handleGetCast(productCategory))
        const crew= handleDivideByYear(handleGetCrew(productCategory,"all"))
        // console.log("cast",cast);
        // console.log("crew",crew)
    })
    return(
        <div>
            <div className="flex">
                <select value={productCategory} onChange={(e)=>handleChangeProductCategory(e)}>
                    {productCategoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                    ))}
                </select>
                <select value={department} onChange={(e)=>handleChangeDepartment(e)}>
                    {departmentOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                    ))}
                </select>
            </div>
            <div>
              
                
            </div>
        </div>
    )
}