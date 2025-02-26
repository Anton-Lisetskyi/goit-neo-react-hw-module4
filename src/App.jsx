import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchImages } from "./api/unsplashAPI";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMoreButton from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (images.length > 16) {
      const timer = setTimeout(() => {
        window.scrollBy({
          top: 1248,
          left: 0,
          behavior: "smooth",
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [images]);

  const handleSearch = async (newQuery) => {
    if (!newQuery || !newQuery.trim()) {
      toast.error("Please, fill the query");
      return;
    }

    if (newQuery === query) return;

    setLoading(true);
    setQuery(newQuery);
    setPage(1);
    setErrorMessage(null);

    try {
      const data = await fetchImages(newQuery, 1);
      if (data.results.length === 0) {
        toast.error("Nothing found.");
      } else {
        setImages(data.results);
        setTotalPages(data.total_pages);
      }
    } catch (error) {
      console.error("Error", error);
      setErrorMessage("Something went wrong...");
    }

    setLoading(false);
  };

  const handleLoadMore = async () => {
    setLoading(true);

    try {
      const nextPage = page + 1;
      const data = await fetchImages(query, nextPage);
      if (data.results.length === 0) {
        toast.info("That's all...");
      } else {
        setImages((prevImages) => [...prevImages, ...data.results]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error", error);
      setErrorMessage("Something went wrong...");
    }

    setLoading(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <>
          <ImageGallery images={images} onImageClick={setSelectedImage} />
          {images.length > 0 && page < totalPages && !loading && (
            <LoadMoreButton onClick={handleLoadMore} />
          )}
        </>
      )}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          image={selectedImage}
        />
      )}
      {loading && <Loader />}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
