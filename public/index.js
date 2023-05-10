// const div = document.getElementById('container1');
const url = 'http://18.117.98.49:2000/api/v1/files'


const getAPI = async () => {
  try {
    const response = await fetch(url)
  const data = await response.json()
  console.log(data)
  } catch (err) {
    console.error(`$Error: ${err}`)
  }
}
getAPI()