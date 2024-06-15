import { exec } from 'child_process';

export async function GET(request) {
  return new Promise((resolve) => {
    exec('python3 ./scripts/bos_feed.py', (error, stdout, stderr) => {
      if (error) {
        resolve(new Response(JSON.stringify({ error: error.message }), { status: 500 }));
        return;
      }
      if (stderr) {
        resolve(new Response(JSON.stringify({ error: stderr }), { status: 500 }));
        return;
      }
      resolve(new Response(JSON.stringify({ output: stdout }), { status: 200 }));
    });
  });
}
