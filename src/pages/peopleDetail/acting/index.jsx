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
    { value: "Acting", text: "Acting"},
    { value: "Production", text: "Production" },
    { value: "Sound", text: "Sound"},
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

    const handleFormatingData=(category, department)=>{
        const movieCastAdded=movieCredits?.cast.map(movie=>{ 
            movie.media_type='movie';
            movie.to='/movie/detail/'+movie.id;
            movie.department='Acting'
            movie.release_year=movie.release_date !==''? new Date(movie.release_date).getFullYear() : 9999;   
            return movie
        }) ?? []
        const tvCastAdded=tvCredits?.cast.map(tv=>{ 
            tv.media_type='tv';
            tv.to='/tv/detail/'+tv.id;
            tv.department='Acting'
            tv.release_year=tv.first_air_date !==''? new Date(tv.first_air_date).getFullYear() : 9999;   
            return tv
        }) ?? [];
        const combinedCast=movieCastAdded.concat(tvCastAdded);
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
        const combinedCrew=movieCrewAdded.concat(tvCrewAdded);
        let combinedCastAndCrew=combinedCrew.concat(combinedCast);
        if(category !== 'all'){
            combinedCastAndCrew=combinedCastAndCrew.filter(movie=> movie.media_type === category);
        }
        if(department !== 'all'){
            combinedCastAndCrew=combinedCastAndCrew.filter(movie=> movie.department === department);
        }
        return combinedCastAndCrew

    }

    const handleDivideByDepartMent=()=>{
        const movies= handleFormatingData(productCategory,department)
        const groupedData= Object.entries(
            movies.reduce((acc, { department, ...rest }) => {
                if (!acc[department]) {
                    acc[department] = [];
                }
                acc[department].push(rest);
                return acc;
            }, {})
        ).map(([department, movies]) => ({ department, movies }));
        return groupedData;

    }
    
    const handleDivideByYear=(movies)=>{
        const movieYear=Array.from(new Set(movies.map(movie=> movie.release_year))).sort((a, b) => b - a);
        const movieDividedByYear=movieYear.map(year=>{
            return{
                year:year,
                movies:movies.filter(movie=> movie.release_year === year),
                
            }
        })
        return movieDividedByYear;
    }
   
    useEffect(()=>{
        if(!movieCredits){
            handleFetchMovieCredits()
        } 
        if(!tvCredits){
            handleFetchTvCredits()
        }
    },[personId])
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
           {
            handleDivideByDepartMent().map((departmentItem,departmentItemIndex)=>{
                const {department,movies}=departmentItem;
                const moviesDividedByYear=handleDivideByYear(movies)
                return(
                    <div key={departmentItemIndex}>
                        <h1 className="text-[20px] font-bold">{department}</h1>
                        <div className="border border-[#e5e5e5]">
                            {moviesDividedByYear.map((movieDividedByYear, movieDividedByYearIndex)=>{
                                const {movies, year}=movieDividedByYear
                                return(
                                    <div key={movieDividedByYearIndex} className="border-b border-[#e5e5e5] flex">
                                        <h1 className="text-[16px] font-bold w-[80px]">{year !== 9999 ? year : "?"}</h1>
                                        <div>
                                        {movies.map(movie=>{
                                            const {credit_id, media_type, to, character}=movie
                                            const title=media_type === 'movie' ? movie.original_title : movie.original_name
                                            const participatedAs=media_type === 'tv' ? `(${movie.episode_count} episode) `: '';
                                            const departmentRole=movie.job
                                            return(
                                                <Link to={to} key={credit_id}>
                                                    <h2 className="text-[16px] font-bold">{title}</h2>
                                                    {department === 'Acting' ?  
                                                        <div className="text-[14px] pl-3">
                                                            {participatedAs}
                                                            <span className="text-gray-500">as </span> 
                                                            {character}
                                                        </div>
                                                        :
                                                        <div className="text-[14px] pl-3">
                                                            <span className="text-gray-500">as </span> 
                                                            {departmentRole}
                                                        </div>
                                                    }
                                                </Link>
                                            )
                                        })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })
           }
                
            </div>
        </div>
    )
}