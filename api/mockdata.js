const mockDataResponse = {
  "id": "chatcmpl-7X8vY5aN9kQvZdT2e5Yz3JbN6LpR0",
  "object": "chat.completion",
  "created": 1699024000,
  "model": "gpt-3.5-turbo",
  "usage": {
    "prompt_tokens": 120,
    "completion_tokens": 250,
    "total_tokens": 370
  },
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "### Learning Task: Introduction to CSS Flexbox\n\n**Topic:** CSS Flexbox\n**Level:** Beginner\n**Time:** 30 minutes\n\n---\n\n**Instructions:**\n1. Read a brief overview of CSS Flexbox, focusing on key concepts such as flex containers, flex items, and common properties like `display: flex`, `justify-content`, and `align-items`.\n2. Create a simple webpage layout using Flexbox that includes a header, main content area with three columns, and a footer.\n3. Apply different Flexbox properties to align and distribute space between the columns.\n\n**Expected Outcomes:**\n- Understand the basic principles of Flexbox layout.\n- Successfully create a responsive layout using Flexbox.\n- Demonstrate the ability to control alignment and spacing of flex items.\n\nFeel free to experiment with different property values to see how the layout changes."
      },
      "finish_reason": "stop"
    }
  ]
}

const mockDataFeedback = {
  "id": "chatcmpl-feedback123456",
  "object": "chat.completion",
  "created": 1720001000,
  "model": "gpt-4o",
  "usage": {
    "prompt_tokens": 142,
    "completion_tokens": 178,
    "total_tokens": 320
  },
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": {
          "feedback": "Your solution demonstrates a good understanding of how to use Flexbox for layout. The structure is clear, and the elements align as expected. To improve, consider adding responsiveness with media queries and using the 'gap' property for better spacing between elements instead of manual margins.",
          "motivation": "You're making excellent progress! Every task you complete builds your confidence and skills — keep experimenting and growing!",
          "nextTopics": [
            "CSS Grid Layout",
            "Responsive Design with Media Queries",
            "Using Utility-First Frameworks like Tailwind CSS"
          ]
        }
      },
      "finish_reason": "stop"
    }
  ]
}


export { mockDataResponse, mockDataFeedback };