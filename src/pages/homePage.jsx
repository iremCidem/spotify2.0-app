import React, { useEffect, useState } from "react";
import SideNav from "../components/sidenav";
import useAuthorization from "../Hooks/useAuthorization";
import axios from "axios";
import { Card, Col, Row, Divider, Typography } from "antd";
import { Skeleton } from "antd";
import { ForwardOutlined } from "@ant-design/icons";

export default function HomePage() {
  const { Title } = Typography;
  const { Meta } = Card;
  const [data, setData] = useState();
  const [authorization, fetchData] = useAuthorization();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authorization) {
      getAlbums();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorization]);

  const getAlbums = async () => {
    const url = "https://api.spotify.com/v1/browse/new-releases?limit=20";
    const headers = {
      Authorization: authorization,
    };
    try {
      const result = await axios.get(url, { headers });
      setData(result.data.albums.items);
    } catch (err) {
      console.error(err);
    }
  };
  let background;
  if (!data) {
    background = "bg-before";
  } else {
    background = "bg";
  }
  return (
    <div className={background}>
      <SideNav />
      <div className="main">
        {data ? (
          <Row gutter={16}>
            <Title className="text-gradient">
              BeatFrenzy{""}
              <ForwardOutlined style={{ color: "#dfcdc3" }} />
            </Title>

            <Divider orientation="center" style={{ color: "#85a5ff" }}>
              New Releases
            </Divider>

            {data.map((item) => {
              return (
                <Col className="gutter-row" span={6} key={item.id}>
                  <Card
                    style={{ width: 240, height: 340, marginBottom: "15px" }}
                    hoverable
                    cover={<img src={item.images[1].url} alt="album" />}
                  >
                    <Meta
                      title={item.artists[0].name}
                      description={item.name}
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <div style={{ paddingTop: "15px" }}>
            <Skeleton active />
            <Skeleton active />
          </div>
        )}
      </div>
    </div>
  );
}
//Ant Design, etkileşimli kullanıcı arabirimleri oluşturmak için yararlı olan ve kullanımı kolay bileşenleri içeren bir React UI kitaplığıdır.
