import React, { useState, useEffect } from "react";
import SideNav from "../components/sidenav";
import useAuthorization from "../Hooks/useAuthorization";
import useGetInfo from "../Hooks/useGetInfo";
import { Input, Card, Col, Row, Typography, Skeleton } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SearchPage() {
  const { Title } = Typography;
  const { Meta } = Card;
  const [authorization, fetchData] = useAuthorization();
  const [inputValue, setInputValue] = useState(null);
  const [playlist, setPlaylist] = useState();
  const [datas, getInfo] = useGetInfo();
  const url = `https://api.spotify.com/v1/search?q=${inputValue}&type=artist`;
  const url1 =
    "https://api.spotify.com/v1/users/noq9tilk2zjs9u9omj2wgefyj/playlists?limit=10";
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getPlaylist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorization]);

  useEffect(() => {
    getInfo(url, authorization);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  function handleChangeInput(e) {
    setInputValue(e.target.value);
  }
  async function getPlaylist() {
    const headers = {
      Authorization: authorization,
    };
    try {
      const data = await axios.get(url1, { headers });
      setPlaylist(data.data.items);
    } catch (error) {
      console.error(error);
    }
  }
  //
  return (
    <div className="bg">
      <SideNav />
      <div className="main">
        <Input
          style={{
            color: "#dfcdc3",
            margin: "8px",
            padding: "8px",
          }}
          onChange={handleChangeInput}
          value={inputValue}
          placeholder="Artist Name"
          prefix={<SearchOutlined className="site-form-item-icon" />}
        />

        {inputValue && datas ? (
          <div className="bg-before">
            {" "}
            <Link
              to={`/search/${datas.artists.items[0].id}`}
              style={{ border: "none", margin: "15px", textDecoration: "none" }}
            >
              <Card
                style={{ width: "220px" }}
                hoverable
                cover={
                  <img
                    src={datas.artists.items[0].images[2].url}
                    alt="artist"
                  />
                }
              >
                <Meta
                  title={datas.artists.items[0].name}
                  description={datas.artists.items[0].genres.map((item) => {
                    return <div key={item}>{item}</div>;
                  })}
                />
              </Card>
            </Link>{" "}
          </div>
        ) : playlist ? (
          <Row gutter={16}>
            <div>
              <Title className="text-gradient">My Playlists</Title>{" "}
            </div>
            {playlist.map((item) => {
              return (
                <Col className="gutter-row" span={6} key={item.id}>
                  <Card
                    style={{ width: 240, height: 300, marginBottom: "15px" }}
                    hoverable
                    cover={<img src={item.images[1].url} alt="pic" />}
                  >
                    <Meta title={item.name} style={{ textAlign: "center" }} />
                  </Card>
                </Col>
              );
            })}{" "}
          </Row>
        ) : (
          <div className="bg-before">
            <Skeleton active />
            <Skeleton active />
          </div>
        )}
      </div>
    </div>
  );
}
