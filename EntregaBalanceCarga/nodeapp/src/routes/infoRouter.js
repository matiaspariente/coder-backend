import express from 'express';
import cpus from 'os'

const router = express.Router();

const proceso = {
    argumentos: process.argv.slice(2),
    plataforma: process.platform,
    node_version: process.versions.node,
    memory_rss: process.memoryUsage.rss(),
    path_exec: process.execPath,
    processid: process.pid,
    carpeta: process.argv[1],
    cant_proc: cpus.cpus().length 
}

router.get('/',(req,res)=>{ 
    res.render('info',{ proceso })
})


export default router;