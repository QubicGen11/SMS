import React, { useState } from "react";

const PhotoUpload = () => {
    const [photo, setPhoto] = useState(
        () =>
            localStorage.getItem("photo") ||
            "https://res.cloudinary.com/devewerw3/image/upload/v1721375467/Teacher_Profile_agfngr.png"
    );

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
                localStorage.setItem("photo", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemovePhoto = () => {
        setPhoto(null);
        localStorage.removeItem("photo");
    };

    const handleViewPhoto = () => {
        if (photo) {
            const newWindow = window.open();
            newWindow.document.write(
                `<img src="${photo}" style="width:100%;height:100%"/>`
            );
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8 mb-8 ">
            <div className="flex justify-between items-center gap-10">
                <div>
                    <label htmlFor="photo-upload" className="cursor-pointer">
                        {photo ? (
                            <img
                                src={photo}
                                alt="Profile"
                                className="rounded-full w-24 h-24 md:w-32 md:h-32"
                            />
                        ) : (
                            <div className="rounded-full bg-gray-300 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                                <span className="z-50">Add Photo</span>
                            </div>
                        )}
                        <input
                            type="file"
                            id="photo-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                        />
                    </label>
                    <div className="flex mt-2">
                        <button
                            className="text-sm md:text-base text-blue-500 hover:text-blue-700 mr-2"
                            onClick={handleViewPhoto}
                        >
                            View
                        </button>
                        <button
                            className="text-sm md:text-base text-red-500 hover:text-red-700"
                            onClick={handleRemovePhoto}
                        >
                            Remove
                        </button>
                    </div>
                </div>

                <div>
                    <div className="mt-2 text-xs text-gray-500">
                        <span className="text-lg font-bold ml-1" >Note:</span>
                        <ul className="list-disc list-inside">
                            <li>Upload the most recent Photo.</li>
                            <li>To be displayed on the ID Card</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoUpload;
