import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SideNav from "../components/sidenav";
import useAuthorization from "../Hooks/useAuthorization";
import { useDispatch } from "react-redux";
import { addAlbum } from "../store/store";
import Album from "../components/album";
import useGetInfo from "../Hooks/useGetInfo";
import { Skeleton, Col, Row } from "antd";

export default function AlbumsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [authorization, fetchData] = useAuthorization();
  const [datas, getInfo] = useGetInfo();
  const url = `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album&limit=30`;

  async function islem() {
    if (!authorization) {
      await fetchData();
      await getInfo(url, authorization);
    } else {
      await getInfo(url, authorization);
    }
  }
  useEffect(() => {
    islem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, authorization]);

  function handleAddList(item) {
    dispatch(addAlbum(item));
  }

  return (
    <div className="bg">
      <SideNav />
      <div className="main">
        {datas ? (
          <Row gutter={16}>
            {datas.items.map((item) => {
              return (
                <Col className="gutter-row" span={6} key={item.id}>
                  <Album key={item.id} action={handleAddList} item={item}>
                    Add Favorites
                  </Album>
                </Col>
              );
            })}{" "}
          </Row>
        ) : (
          <div className="bg-before">
            <Skeleton active />
          </div>
        )}
      </div>
    </div>
  );
}
