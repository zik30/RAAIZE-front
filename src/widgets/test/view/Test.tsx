import { $authApi } from '@src/shared/lib/requester/requester';
import { CustomButton } from '@src/shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';

const useCreatePresentationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      html,
      board_id,
    }: {
      title: string;
      html: string;
      board_id: number;
    }) => {
      const { data } = await $authApi.post('/presentations/', {
        title,
        content: {
          additionalProp1: { html },
        },
        board_id,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['presentations'] });
    },
  });
};

export const Test: FC = () => {
  const { mutate: createPresentation } = useCreatePresentationMutation();

  const handlePost = () => {
    createPresentation({
      title: 'React JSX',
      html: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>React JSX Explained</title><style>body{background:linear-gradient(120deg, rgb(4, 24, 113) 0%, #282c34 100%);color:#fff;font-family:Arial,sans-serif;margin:0;padding:40px;}.slide{margin:40px auto;max-width:700px;background:rgba(40,44,52,0.85);border-radius:16px;box-shadow:0 4px 16px #61dafb;padding:40px;}h2{color:#61dafb;border-bottom:1px solid #61dafb;margin-bottom:20px;}.content{font-size:1.2em;}.problem{font-weight:bold;margin-bottom:15px;}.solution{background-color:#3d4148;padding:15px;border-left:4px solid #61dafb;margin-top:15px;display:none;}.show-solution{background-color:#61dafb;color:#282c34;border:none;padding:8px 15px;border-radius:4px;cursor:pointer;margin-top:10px;}.code{font-family:monospace;background:#3d4148;padding:2px 4px;border-radius:3px;}</style></head><body><h1 style="text-align:center;color:#61dafb;">React JSX Explained</h1><div class="slide"><h2>What is JSX?</h2><div class="content"><div class="problem">JSX is a syntax extension for JavaScript that looks similar to HTML but produces React elements.</div><button class="show-solution" onclick="toggleSolution("solution1")">Show Details</button><div id="solution1" class="solution">JSX is neither a string nor HTML - it compiles to <span class="code">React.createElement()</span> calls that return plain JavaScript objects describing UI structure.</div></div></div><div class="slide"><h2>JSX vs HTML</h2><div class="content"><div class="problem">How does JSX differ from regular HTML?</div><button class="show-solution" onclick="toggleSolution("solution2")">Show Differences</button><div id="solution2" class="solution">Key differences: 1) Attributes use camelCase (<span class="code">className</span> not <span class="code">class</span>), 2) Self-closing tags are required (<span class="code">&lt;img /&gt;</span>), 3) JavaScript expressions in curly braces <span class="code">{}</span>, 4) Inline styles are objects.</div></div></div><div class="slide"><h2>JSX Under the Hood</h2><div class="content"><div class="problem">This JSX: <span class="code">&lt;div className="header"&gt;Hello&lt;/div&gt;</span></div><div>Compiles to: <span class="code">React.createElement("div", {className: "header"}, "Hello")</span></div><div>Which returns an object like: <span class="code">{type: "div", props: {className: "header", children: "Hello"}}</span></div></div></div><div class="slide"><h2>Why Use JSX?</h2><div class="content"><div class="problem">Benefits of JSX over plain JavaScript:</div><div><p>1) More readable and familiar syntax for defining UI</p><p>2) Visual structure matches DOM structure</p><p>3) React can show more useful error messages</p><p>4) Combines rendering logic with UI markup</p></div></div></div><script>function toggleSolution(id){const solution=document.getElementById(id);if(solution.style.display==="block"){solution.style.display="none";event.target.textContent="Show Solution";}else{solution.style.display="block";event.target.textContent="Hide Solution";}}</script></body></html>',
      board_id: 1,
    });
  };

  return (
    <div>
      <CustomButton onclick={handlePost}>Make presentation</CustomButton>
    </div>
  );
};
