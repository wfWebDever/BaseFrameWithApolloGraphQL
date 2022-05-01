import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Table } from 'antd'

// const EXCHANGE_RATES = gql`
//   query GetExchangeRates($currency: String!) {
//     rates(currency: $currency) {
//       currency
//       rate
//     }
//   }
// `
const CORES = gql`
  query Cores($limit: Int, $offset: Int) {
    cores(limit: $limit, offset: $offset) {
      id
    }
  }
`

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 400
  }
]
function PageDemo() {
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
    total: 10 * 10
  })

  const {
    loading,
    data: { cores } = {}
    // fetchMore
  } = useQuery(CORES, {
    variables: {
      offset: (page.page - 1) * page.pageSize,
      limit: page.pageSize
    }
  })
  const onChange = (page, pageSize) => {
    console.info(page, pageSize)
    setPage({
      page,
      pageSize,
      total: pageSize * 10 + pageSize
    })
  }
  return (
    <div>
      <Table
        loading={loading}
        rowKey="id"
        dataSource={cores}
        columns={columns}
        scroll={{
          y: 600,
          x: '100vw'
        }}
        pagination={{
          current: page.page,
          pageSize: page.pageSize,
          showSizeChanger: true,
          onChange,
          total: page.total
        }}
      />
    </div>
  )
}
export default PageDemo
