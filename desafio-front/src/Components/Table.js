import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';


const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const TableInfor = ({data}) =>{

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Procurar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Procurar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Apagar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Fechar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'HOSTNAME',
      dataIndex: 'hostname',
      key: 'hostname',
      width: '30%',
      ...getColumnSearchProps('hostname'),
    },
    {
      title: 'IP ADDRESS',
      dataIndex: 'ip_adress',
      key: "ip_adress",
      width: '30%',
      ...getColumnSearchProps('ip_adress'),
    },
    {
      title: 'VULNERABILITY - TITLE',
      dataIndex: 'vulnerability_title',
      key: "vulnerability_title",
      width: '30%',
      ...getColumnSearchProps('vulnerability_title'),
    },
    {
      title: 'VULNERABILITY - SEVERITY',
      dataIndex: 'vulnerability_severity',
      key: "vulnerability_severity",
      width: '30%',
      ...getColumnSearchProps('vulnerability_severity'),
    },
    {
      title: 'VULNERABILITY - CVSS',
      dataIndex: 'vulnerability_cvss',
      key: "vulnerability_cvss",
      width: '30%',
      ...getColumnSearchProps('vulnerability_cvss'),
    },
    {
      title: 'VULNERABILITY - PUBLICATION_DATE',
      dataIndex: 'vulnerability_publication_date',
      key: "vulnerability_publication_date",
      width: '30%',
      ...getColumnSearchProps('vulnerability_publication_date'),
    },
  ];

  return(
    <Table columns={columns} dataSource={data} onChange={onChange} />
  )

} 

export default TableInfor;