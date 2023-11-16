const checkImages = async (array) => {
    const invalidPromises = array.map(async (obj) => {
        try {
        const isValid = await checkImage(obj.previewImage || obj.url);
        if (!isValid) {
            return obj.previewImage || obj.url;
        }
        } catch (error) {
        console.error("Error checking image:", error);
        return obj.previewImage || obj.url; // also add url if there is an error
        }
        return null; // if url is working
    });

    const invalidUrls = (await Promise.all(invalidPromises)).filter(url => url !== null);

    return invalidUrls;
};

const checkImage = (url) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = function () {
        resolve(true);
        };
        img.onerror = function () {
        resolve(false);
        };
        img.src = url;
    });
}

export default checkImages;
