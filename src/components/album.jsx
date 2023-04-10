import React from "react";
import { Button, Card } from "antd";

export default function Album({ item, action, children }) {
  const { Meta } = Card;
  return (
    <div key={item.id} style={{ marginTop: "10px" }}>
      <Card
        style={{ width: 240 }}
        hoverable
        cover={<img src={item.images[1].url} alt="albums" />}
      >
        <Meta title={item.name} style={{ marginBottom: "5px" }} />
        <Button onClick={() => action(item)} className="bg-pink">
          {children}{" "}
        </Button>
      </Card>
    </div>
  );
}
