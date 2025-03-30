const imageUrl = "https://image.tmdb.org/t/p/original/9YDXLJnp2N62uicerbvK2zGhetP.jpg";
const paragraph=`Millions of movies, TV shows and people to discover. Explore now.`
export const Search=()=>{
    return(
        <div 
            className="w-full py-[120px]" 
            style={{ 
            background:'rgb(22, 201, 253)',
            backgroundImage:`url(${imageUrl})`, 
            backgroundSize: 'cover',
            backgroundPositionX: '50%',
            backgroundPositionY: '50%',
            backgroundBlendMode:'multiply'
         }}
        >
          <div className="w-[1200px] mx-auto">
            <div className="text-white">
                <div>Welcome.</div>
                <p>{paragraph}</p>
            </div>
          </div>
        </div>
    )
}