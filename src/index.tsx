import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Pagination from "./component/pagination/index";
import Table, { AppProps } from "./component/table/index";
import axios from "axios";
const App: React.FC<AppProps> = ({ url, config }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${url}?page=${currentPage}&size=${config.pageSize}`
      );
      setItems(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <div>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Table items={items} config={config} />
      </Canvas>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
