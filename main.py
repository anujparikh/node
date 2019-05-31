import aiohttp
import asyncio

async def fetch(session, url):
    async with session.get(url) as response:
        return response.status


async def main():
  list = ["http://google.com", "http://google1.com", "http://localhost:8080"]
  resultList = {}
  async with aiohttp.ClientSession() as session:
    statusVal = False
    for i in list:
      try:
        async with session.get(i) as resp:
          if (resp.status == 200):
            val = {i : True}
            resultList.update(val)
      except:
        val = {i: False}
        resultList.update(val)
        #print (await resp.text())

    print (resultList)
loop = asyncio.get_event_loop()
loop.run_until_complete(main())