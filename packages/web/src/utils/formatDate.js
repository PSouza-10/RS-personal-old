const formatDate = date => {
  const dateString = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`

  onChange(dateString)
}
