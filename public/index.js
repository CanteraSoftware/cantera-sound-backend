// const div = document.getElementById('container1');
const url = 'http://18.117.98.49:2000/api/v1/files'


const getAPI = async () => {
  const response = await fetch(url)
  const data = await response.json()
  console.log(data)
}
getAPI()