

export const BlogSkeleton = () => {
  return (
    <div className="w-screen h-full bg-[#f7f6f1] mb-[4rem]">
      
      <div className="mb-4 bg-white shadow-sm">
        <div className="h-14 w-full flex items-center justify-between px-4">
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>

   
      {[1, 2, 3].map((index) => (
        <div key={index} className="p-1 flex justify-center items-center mt-20">
          <div className="max-w-xl w-full border-b border-slate-400">
           
            <div className="flex items-center">
            
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
              
            
              <div className="ml-4 flex items-center">
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="ml-2 w-20 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>

            <div className="mt-2">
              <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse" />
            </div>

       
            <div className="mt-2">
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse" />
            </div>

           
            <div className="mt-1 mb-2">
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};



export const FullBlogSkeleton = () => {
    return (
      <div>
       
        <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
          <div className="h-14 w-full flex items-center justify-between px-4">
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
  
        <div className="mt-[10rem] h-full flex justify-center items-center">
          <div className="w-full grid grid-cols-12 mx-20">
          
            <div className="col-span-8">
             
              <div className="w-[80%]">
                <div className="h-12 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
              </div>
  
              
              <div className="mt-2 w-48 h-6 bg-gray-200 rounded animate-pulse" />
  
           
              <div className="mt-8 space-y-4">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="w-full h-6 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
  
          
            <div className="col-span-4 flex ml-8">
              <div>
               
                <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
  
            
                <div className="flex mt-8 items-center">
                 
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
  
               
                  <div className="ml-8">
                    <div className="w-48 h-10 bg-gray-200 rounded animate-pulse" />
                    <div className="mt-2 space-y-2">
                      <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default FullBlogSkeleton;