import { type IController, type HttpRequest } from '@/presentation/protocols'
import { type Request, type Response } from 'express'
import clc from 'cli-color'

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const request: HttpRequest = {
      body: req.body,
      headers: req.headers,
      params: req.params,
      query: req.query
    }
    const response = await controller.handle(request)
    if (response.statusCode >= 200 && response.statusCode <= 299) {
      res.status(response.statusCode).json(response.body)
    } else {
      res.status(response.statusCode).json({
        error: response.body.message
      })
    }

    const statusCodeColor = (statusCode: string): any => {
      if (statusCode.startsWith('2')) return clc.green(statusCode)
      if (statusCode.startsWith('4') || statusCode.startsWith('5')) return clc.red(statusCode)
      return clc.yellow(statusCode)
    }

    process.stdout.write(`
      \r${clc.blue('Date:')} ${clc.blackBright(new Date().toLocaleString())}
      \r${clc.blue('Status code:')} ${statusCodeColor(response.statusCode.toString())}
      \r${clc.blue('Method:')} ${clc.blackBright(req.method)}
      \r${clc.blue('Host')} ${clc.blackBright(req.hostname)}
      \r${clc.blue('Base URL')} ${clc.blackBright(req.baseUrl)}
      \r${clc.blue('HTTP Resource:')} ${clc.blackBright(req.path)}
      \r${clc.blue('HTTP Params:')} ${clc.blackBright(JSON.stringify(req.params))}
      \r${clc.blue('Headers:')} ${clc.blackBright(JSON.stringify(req.headers))}
      \r${clc.blue('Request Body:')} ${clc.white(JSON.stringify(req.body))}
      \r${clc.blue('Response Body:')} ${clc.white(JSON.stringify(response.body)
    )}
    `)
  }
}
