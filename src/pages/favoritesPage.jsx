import React from "react";
import SideNav from "../components/sidenav";
import { useDispatch, useSelector } from "react-redux";
import Album from "../components/album";
import { removeAlbum } from "../store/store";
import { Col, Row } from "antd";
import { FrownOutlined } from "@ant-design/icons";

export default function Favorites() {
  const dispatch = useDispatch();
  const albumList = useSelector((state) => {
    return state.albums.AlbumsList;
  });
  const handleRemoveAlbum = (id) => {
    dispatch(removeAlbum(id));
  };

  return (
    <div className="bg-before">
      <SideNav />
      <div className="main">
        <Row gutter={16}>
          {albumList.length === 0 ? (
            <div className="center">
              <h2 className="center-in " style={{ color: "#5f6769" }}>
                It seems your favorites are currently empty <FrownOutlined />
              </h2>{" "}
            </div>
          ) : (
            albumList.map((item) => {
              return (
                <Col className="gutter-row" span={6} key={item.id}>
                  <Album
                    key={item.id}
                    item={item.item}
                    action={handleRemoveAlbum}
                  >
                    Remove from
                  </Album>
                </Col>
              );
            })
          )}
        </Row>
      </div>
    </div>
  );
}
