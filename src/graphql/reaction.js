export const GET_REACTION_MUTATION = type => `
  mutation ${type.slice(0, 1).toUpperCase() + type.slice(1)}ReactionToIssue(
    $subjectId: ID!
    $content: ReactionContent!
  ) {
    ${type}Reaction(input: { subjectId: $subjectId, content: $content }) {
      reaction {
        content
        id
        user {
          avatarUrl
          login
          name
        }
      }
      subject {
        id
      }
    }
  }
`;
