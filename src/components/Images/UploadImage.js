import React from "react";

const UploadImage = () => {
    return (<div className="bg-blue-50 px-4 flex-colo">
        <form className="bg-blue-100 shadow-md rounded w-full flex-colo py-12 px-4">
            <button type="button"
                    className="w-full text-lg font-bold border-dashed h-56 border-blue-800 text-blue-800 p-12">
                Choose Image
            </button>
            {/* input title */}
            <input type="text" className="w-full my-8 bg-write py-4 px-2 rounded border border-blue-800 text-blue-800"/>
        </form>
    </div>)
}

export default UploadImage;
