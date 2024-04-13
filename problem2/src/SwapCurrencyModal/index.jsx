import React, { useState, useEffect } from "react";
import { Button, Divider, Input, Modal, Select, Space, Typography } from "antd";
import { data } from "./data";

const ModalSwapCurrency = () => {
  const { Text, Title, Paragraph } = Typography;
  const [open, setOpen] = useState(false);
  const [sendCurrency, setSendCurrency] = useState("KUJI");
  const [receiveCurrency, setReceiveCurrency] = useState("USD");
  const [sendExchangeRate, setSendExchangeRate] = useState(0);
  const [receiveExchangeRate, setReceiveExchangeRate] = useState(0);
  const [sendAmount, setSendAmount] = useState(0);
  const [receiveAmount, setReceiveAmount] = useState(0);
  useEffect(() => {
    const sendRate = data.find(
      (entry) => entry.currency === sendCurrency
    )?.price;
    const receiveRate = data.find(
      (entry) => entry.currency === receiveCurrency
    )?.price;
    setSendExchangeRate(sendRate || 0);
    setReceiveExchangeRate(receiveRate || 0);
  }, [sendCurrency, receiveCurrency]);
  const dataSelect = data.map((entry) => ({
    value: entry.currency,
    label: entry.currency,
  }));
  const showModal = () => setOpen(true);
  const handleOk = () => setOpen(false);
  const handleCancel = () => setOpen(false);

  const onChangeInputSendAmount = (e) => {
    const inputValue = e.target.value;
    let z = document.forms["myForm"]["num"].value;
    var a = document.forms["myForm"]["num"].value;
    if (a == null || a == "") {
      alert("Please Fill In The Required Fields");
      return;
    }
    if (!/^[0-9]+$/.test(z)) {
      alert("Please only enter numeric characters only for the input!)");
      return;
    }
    setSendAmount(inputValue);
    setReceiveAmount(inputValue * sendExchangeRate);
  };

  const onChangeReceiveCurrency = (value) => {
    setReceiveCurrency(value);
    setReceiveAmount(sendAmount * (sendExchangeRate / receiveExchangeRate));
  };

  const onChangeSendCurrency = (value) => {
    setSendCurrency(value);
    setSendAmount(receiveAmount * (receiveExchangeRate / sendExchangeRate));
  };

  const renderTitle = () => (
    <div style={{ maxWidth: "330px" }}>
      <div>
        <Title style={{ margin: 0 }} level={3}>
          Swap
        </Title>
      </div>
      <div style={{ paddingTop: 8 }}>
        <Paragraph type="secondary">
          Swap Any Assets Simply And Securely With Coin-Ex Self Developed
          Algorithm
        </Paragraph>
      </div>
    </div>
  );
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
      </div>
      <Modal
        open={open}
        title={renderTitle()}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        width={800}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <Divider style={{ margin: 0 }} />
        <form name="myForm">
          <div
            style={{
              border: "1px solid",
              borderRadius: "10px",
              width: "100%",
              height: "200px",
            }}
          >
            <div style={{ padding: "30px" }}>
              <Space style={{ justifyContent: "space-between" }}>
                <div>
                  <Text style={{ padding: "0 0 20px 5px" }}>
                    Amount to send
                  </Text>
                  <Space>
                    <Select
                      defaultValue="KUJI"
                      onChange={onChangeSendCurrency}
                      options={dataSelect}
                    />
                    <Input
                      name="num"
                      onChange={onChangeInputSendAmount}
                      value={sendAmount}
                    />
                  </Space>
                </div>
                <div>
                  <Text style={{ padding: "0 0 20px 5px" }}>
                    Amount to receive
                  </Text>
                  <Space>
                    <Select
                      defaultValue="USD"
                      onChange={onChangeReceiveCurrency}
                      options={dataSelect}
                    />
                    <Input readOnly value={receiveAmount} />
                  </Space>
                </div>
              </Space>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalSwapCurrency;
