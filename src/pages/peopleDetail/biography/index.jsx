export const PersonBiography=({personDetail})=>{
     const {name, biography}=personDetail;
    const biographyInnerHTML=(biography && biography.length>0) ?biography.replace(/\n/g, "<br>"): "We havent had biography for this yet"
    return(
        <div>
            <h1 className="text-[25px]">{name}</h1>
            <div>
                <span className="font-bold">Biography</span>
                <p className="text-wrap" dangerouslySetInnerHTML={{ __html: biographyInnerHTML }} />
            </div>
        </div>
    )
}