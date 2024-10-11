const searchForTerm = (searchTerm, list) => {
    return list.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
}

export default searchForTerm